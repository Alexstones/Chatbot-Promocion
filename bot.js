import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

function loadDotenvFile(filePath) {
	if (!fs.existsSync(filePath)) return;
	const contents = fs.readFileSync(filePath, 'utf8');
	for (const line of contents.split(/\r?\n/)) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const [key, ...rest] = trimmed.split('=');
		if (!key) continue;
		const value = rest.join('=').trim();
		if (value === '' || key in process.env) continue;
		process.env[key] = value;
	}
}

const envPath = path.resolve(process.cwd(), '.env');
loadDotenvFile(envPath);

const BOT_PHONE_NUMBER = process.env.BOT_PHONE_NUMBER?.trim();
if (!BOT_PHONE_NUMBER) {
	console.error('❌ BOT_PHONE_NUMBER no está definido en .env');
	process.exit(1);
}

if (!/^[0-9]+$/.test(BOT_PHONE_NUMBER)) {
	console.warn('⚠️ BOT_PHONE_NUMBER debe contener solo dígitos, sin + ni espacios.');
}

// Define temporary path for WhatsApp auth state
const AUTH_DIR = './whatsapp_session';
const CHATBOT_API_URL = process.env.CHATBOT_API_URL || 'http://127.0.0.1:5173/api/whatsapp/send';
let devServerProcess = null;
let devServerReady = false;
let devServerStarting = false;
const processedMessageIds = new Map();
let reconnectTimer = null;
let reconnectAttempts = 0;

function getDevServerCommand() {
	return process.platform === 'win32' ? 'npx.cmd' : 'npx';
}

async function waitForDevServer(timeoutMs = 30000) {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			const response = await fetch('http://127.0.0.1:5173/', { method: 'GET' });
			if (response.ok || response.status < 500) return true;
		} catch {
			// Server still starting up
		}
		await new Promise((resolve) => setTimeout(resolve, 1500));
	}
	return false;
}

function isDuplicateMessage(msg) {
	const messageId = msg?.key?.id;
	if (!messageId) return false;

	const now = Date.now();
	const lastSeen = processedMessageIds.get(messageId);
	if (lastSeen && now - lastSeen < 8000) {
		return true;
	}

	processedMessageIds.set(messageId, now);
	for (const [id, timestamp] of processedMessageIds.entries()) {
		if (now - timestamp > 20000) {
			processedMessageIds.delete(id);
		}
	}

	return false;
}

async function ensureChatbotEngineReady() {
	const alreadyReady = await waitForDevServer(2000);
	if (alreadyReady) {
		devServerReady = true;
		return;
	}

	if (devServerStarting || devServerProcess) return;

	devServerStarting = true;
	console.log('🚀 Iniciando motor del chatbot en segundo plano...');
	const command = getDevServerCommand();
	devServerProcess = spawn(command, ['vite', 'dev', '--host', '127.0.0.1', '--port', '5173', '--strictPort'], {
		cwd: process.cwd(),
		stdio: 'inherit',
		shell: true
	});

	devServerProcess.on('exit', (code) => {
		console.log(`⚠️ El servidor del chatbot terminó con el código: ${code}`);
		devServerProcess = null;
		devServerReady = false;
		devServerStarting = false;
	});

	const ready = await waitForDevServer(40000);
	devServerReady = ready;
	if (!ready) {
		console.error('❌ No fue posible levantar el motor del chatbot en http://127.0.0.1:5173');
	}
	devServerStarting = false;
}

async function sendToChatbotEngine(payload) {
	await ensureChatbotEngineReady();

	const response = await fetch(CHATBOT_API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});

	const rawBody = await response.text();
	let data;
	try {
		data = JSON.parse(rawBody);
	} catch {
		data = { raw: rawBody };
	}

	console.log(`🧠 Respuesta del motor (${response.status}):`, data);

	if (!response.ok) {
		throw new Error(`Motor del chatbot respondió con ${response.status}: ${rawBody}`);
	}

	return data;
}

function clearSessionAndReconnect(delayMs = 8000) {
	if (reconnectTimer) {
		clearTimeout(reconnectTimer);
	}

	if (fs.existsSync(AUTH_DIR)) {
		fs.rmSync(AUTH_DIR, { recursive: true, force: true });
	}

	console.log('🧹 Sesión de WhatsApp limpiada por conflicto o sesión inválida.');
	console.log('🔁 Intentando volver a vincular el número en unos segundos...');

	reconnectTimer = setTimeout(() => {
		reconnectTimer = null;
		connectToWhatsApp();
	}, delayMs);
}

async function connectToWhatsApp() {
	console.log('🔌 Inicializando socket de WhatsApp (Baileys)...');
	console.log(`🔧 Usando BOT_PHONE_NUMBER: ${BOT_PHONE_NUMBER}`);
	const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

	const sock = makeWASocket({
		auth: state,
		// Re-enable QR terminal printing so you can scan the QR from your phone over SSH.
		printQRInTerminal: true,
		// Increase logger level to help diagnose pairing failures on the VPS.
		logger: pino({ level: 'info' }),
		browser: ['Ubuntu', 'Chrome', '20.0.04']
	});

	sock.ev.on('creds.update', saveCreds);

	// Request pairing code if credentials are not yet configured
	const phoneNumber = process.env.BOT_PHONE_NUMBER || '521234567890'; // Configured telephone
	
	sock.ev.on('connection.update', async (update) => {
		const { connection, lastDisconnect, qr } = update;

		if (connection === 'connecting' && !state.creds.registered) {
			// Try to request a numeric pairing code repeatedly (some servers/timeouts may reject first attempts)
			// Increase attempts and delay to cope with transient ATN/401 issues seen on some VPSes.
			const maxAttempts = 10;
			const delayMs = 8000;
			(async () => {
				for (let attempt = 1; attempt <= maxAttempts; attempt++) {
					try {
						const code = await sock.requestPairingCode(phoneNumber);
						console.log(`\n🔑 [CÓDIGO DE VINCULACIÓN WHATSAPP] (intento ${attempt}/${maxAttempts}): ${code}\n`);
						console.log('Introduce este código de 8 dígitos en la app de tu celular:');
						console.log('Ajustes > Dispositivos vinculados > Vincular un dispositivo > Vincular con el número de teléfono.\n');
						break;
					} catch (err) {
						// Log detailed error payload for diagnosis (statusCode/location/message)
						try {
							console.error(`❌ Error solicitando código (intento ${attempt}):`, JSON.stringify(err?.output?.payload || err?.toString()));
						} catch (logErr) {
							console.error('❌ Error solicitando código (intento', attempt, '):', err);
						}
						if (attempt < maxAttempts) await new Promise((r) => setTimeout(r, delayMs));
						else console.error('❌ No fue posible obtener código de vinculación después de varios intentos.');
					}
				}
			})();
		}

		if (qr) {
			console.log('\n🔳 QR para escanear (terminal):\n');
			console.log(qr);
		}

		if (connection === 'close') {
			const statusCode = lastDisconnect?.error?.output?.statusCode;
			const message = lastDisconnect?.error?.message || '';
			const isConflict = statusCode === DisconnectReason.connectionReplaced || statusCode === 440 || message.includes('conflict') || message.includes('replaced');
			const isUnauthorized = statusCode === 401 || message.includes('Unauthorized') || message.includes('Connection Failure');
			const shouldReconnect = statusCode !== DisconnectReason.loggedOut && !isConflict && !isUnauthorized;
			console.log('❌ Conexión cerrada debido a:', lastDisconnect?.error, '. ¿Reconectar?:', shouldReconnect);
			
			if (isConflict || isUnauthorized) {
				console.log('⚠️ Sesión de WhatsApp inválida o rechazada. Se limpiará la sesión actual para volver a vincular el número.');
				clearSessionAndReconnect(8000);
			} else if (shouldReconnect && reconnectAttempts < 2) {
				reconnectAttempts += 1;
				console.log('🔄 Reintentando conexión en 5 segundos...');
				reconnectTimer = setTimeout(() => {
					reconnectTimer = null;
					connectToWhatsApp();
				}, 5000);
			} else {
				console.log('🗑️ Sesión cerrada por el usuario o sin reconexión posible. Limpiando credenciales...');
				if (fs.existsSync(AUTH_DIR)) {
					fs.rmSync(AUTH_DIR, { recursive: true, force: true });
				}
				process.exit(0);
			}
		} else if (connection === 'open') {
			reconnectAttempts = 0;
			console.log('✅ ¡Sesión de WhatsApp establecida con éxito!');
		}
	});

	// Listen for incoming messages
	sock.ev.on('messages.upsert', async (m) => {
		if (!m?.messages?.length) return;

		for (const msg of m.messages) {
			if (msg.key.fromMe || !msg.message || msg.message.protocolMessage) continue;

			const sender = msg.key.remoteJid;
			const senderNumber = sender.replace('@s.whatsapp.net', '');
			const contactName = msg.pushName || 'Contacto WhatsApp';
			
			// Extract message text content
			let text = '';
			if (msg.message.conversation) {
				text = msg.message.conversation;
			} else if (msg.message.extendedTextMessage) {
				text = msg.message.extendedTextMessage.text;
			}

			if (!text.trim()) continue;
			if (isDuplicateMessage(msg)) {
				console.log(`↩️ Ignorando mensaje duplicado de ${contactName} (${senderNumber})`);
				continue;
			}

			console.log(`📥 Mensaje recibido de ${contactName} (${senderNumber}): ${text}`);

			try {
				const data = await sendToChatbotEngine({
					message: text,
					whatsappNumber: senderNumber,
					contactName,
					messageType: 'text'
				});

				if (data.success && data.result) {
					console.log(`📤 Enviando respuesta a ${senderNumber}: ${data.result.text}`);
					await sock.sendMessage(sender, { text: data.result.text });
				} else {
					console.warn(`⚠️ El motor del chatbot no devolvió una respuesta válida para ${senderNumber}:`, data);
				}
			} catch (error) {
				console.error('❌ Error al procesar mensaje con el motor:', error);
			}
		}
	});
}

// Start connection
connectToWhatsApp();
