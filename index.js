import { spawn } from 'child_process';
import path from 'path';

function startBot() {
	console.log('🚀 Iniciando proceso principal del Bot de WhatsApp...');
	
	const botProcess = spawn('node', ['bot.js'], {
		stdio: 'inherit',
		shell: true
	});

	botProcess.on('close', (code) => {
		console.log(`⚠️ El proceso del bot terminó con el código de salida: ${code}`);
		console.log('🔄 Reiniciando bot en 5 segundos...');
		setTimeout(startBot, 5000);
	});

	botProcess.on('error', (err) => {
		console.error('❌ Fallo al iniciar el proceso del bot:', err);
		console.log('🔄 Reintentando en 5 segundos...');
		setTimeout(startBot, 5000);
	});
}

startBot();
