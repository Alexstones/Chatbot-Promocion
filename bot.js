import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import pino from 'pino';
import fs from 'fs';
import path from 'path';

// Define temporary path for WhatsApp auth state
const AUTH_DIR = './whatsapp_session';

async function connectToWhatsApp() {
	console.log('🔌 Inicializando socket de WhatsApp (Baileys)...');
	const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

	const sock = makeWASocket({
		auth: state,
		printQRInTerminal: false, // Disable QR code print
		logger: pino({ level: 'silent' }),
		browser: ['Chrome (Linux)', '', ''] // Browser name format
	});

	sock.ev.on('creds.update', saveCreds);

	// Request pairing code if credentials are not yet configured
	const phoneNumber = process.env.BOT_PHONE_NUMBER || '521234567890'; // Configured telephone
	
	sock.ev.on('connection.update', async (update) => {
		const { connection, lastDisconnect, qr } = update;

		if (connection === 'connecting' && !state.creds.registered) {
			try {
				// Request pairing code from WhatsApp Web servers
				setTimeout(async () => {
					const code = await sock.requestPairingCode(phoneNumber);
					console.log(`\n🔑 [CÓDIGO DE VINCULACIÓN WHATSAPP]: ${code}\n`);
					console.log(`Introduce este código de 8 dígitos en la app de tu celular:`);
					console.log(`Ajustes > Dispositivos vinculados > Vincular un dispositivo > Vincular con el número de teléfono.\n`);
				}, 3000);
			} catch (err) {
				console.error('❌ Error al solicitar código de vinculación:', err);
			}
		}

		if (connection === 'close') {
			const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
			console.log('❌ Conexión cerrada debido a:', lastDisconnect?.error, '. ¿Reconectar?:', shouldReconnect);
			
			if (shouldReconnect) {
				console.log('🔄 Reintentando conexión en 5 segundos...');
				setTimeout(connectToWhatsApp, 5000);
			} else {
				console.log('🗑️ Sesión cerrada por el usuario. Limpiando credenciales...');
				if (fs.existsSync(AUTH_DIR)) {
					fs.rmSync(AUTH_DIR, { recursive: true, force: true });
				}
				process.exit(0);
			}
		} else if (connection === 'open') {
			console.log('✅ ¡Sesión de WhatsApp establecida con éxito!');
		}
	});

	// Listen for incoming messages
	sock.ev.on('messages.upsert', async (m) => {
		if (m.type !== 'notify') return;

		for (const msg of m.messages) {
			if (msg.key.fromMe || !msg.message) continue;

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

			console.log(`📥 Mensaje recibido de ${contactName} (${senderNumber}): ${text}`);

			try {
				// Send to SvelteKit server chatbot engine API
				const response = await fetch('http://localhost:5173/api/whatsapp/send', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						message: text,
						whatsappNumber: senderNumber,
						contactName,
						messageType: 'text'
					})
				});

				const data = await response.json();

				if (data.success && data.result) {
					console.log(`📤 Enviando respuesta a ${senderNumber}: ${data.result.text}`);
					await sock.sendMessage(sender, { text: data.result.text });
				}
			} catch (error) {
				console.error('❌ Error al procesar mensaje con el motor:', error);
			}
		}
	});
}

// Start connection
connectToWhatsApp();
