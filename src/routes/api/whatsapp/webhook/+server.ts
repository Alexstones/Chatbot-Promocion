import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { WHATSAPP_VERIFY_TOKEN, WHATSAPP_APP_SECRET } from '$env/static/private';
import { processMessage } from '$lib/server/chatbot/engine';
import { sendTextMessage, sendButtonMessage, sendListMessage, markAsRead } from '$lib/server/whatsapp';
import type { WhatsAppIncomingMessage, WhatsAppWebhookPayload } from '$lib/types/whatsapp';
import crypto from 'crypto';

/**
 * GET: Webhook verification (GET challenge from Meta)
 */
export const GET: RequestHandler = async ({ url }) => {
	const mode = url.searchParams.get('hub.mode');
	const token = url.searchParams.get('hub.verify_token');
	const challenge = url.searchParams.get('hub.challenge');

	if (mode && token) {
		if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
			console.log('✅ Webhook verified successfully!');
			return new Response(challenge, { status: 200 });
		} else {
			return new Response('Forbidden', { status: 403 });
		}
	}

	return new Response('Bad Request', { status: 400 });
};

/**
 * POST: Receive message webhook from WhatsApp Cloud API
 */
export const POST: RequestHandler = async ({ request }) => {
	const rawBody = await request.text();

	// 1. Verify Meta Signature if App Secret is set
	if (WHATSAPP_APP_SECRET && WHATSAPP_APP_SECRET !== 'your_app_secret') {
		const signature = request.headers.get('x-hub-signature-256');
		if (!signature) {
			return new Response('Signature missing', { status: 401 });
		}

		const hmac = crypto.createHmac('sha256', WHATSAPP_APP_SECRET);
		const digest = 'sha256=' + hmac.update(rawBody).digest('hex');

		try {
			if (!crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))) {
				console.error('❌ Webhook signature verification failed');
				return new Response('Invalid signature', { status: 401 });
			}
		} catch (e) {
			console.error('Error during signature comparison:', e);
			return new Response('Error validating signature', { status: 500 });
		}
	}

	const payload: WhatsAppWebhookPayload = JSON.parse(rawBody);

	// Ensure it's a whatsapp payload
	if (payload.object !== 'whatsapp_business_account') {
		return json({ error: 'Not a WhatsApp payload' }, { status: 400 });
	}

	// 2. Extract messages and process them
	const entries = payload.entry || [];
	for (const entry of entries) {
		const changes = entry.changes || [];
		for (const change of changes) {
			const value = change.value;
			if (!value || !value.messages) continue;

			const contact = value.contacts?.[0];
			const contactName = contact?.profile?.name || 'Usuario';
			const messages = value.messages || [];

			for (const msg of messages) {
				// Avoid processing statuses or duplicates
				if (!msg.id || !msg.from) continue;

				// Mark as read
				await markAsRead(msg.id);

				// Process message based on type
				try {
					await handleIncomingMessage(msg, contactName);
				} catch (err) {
					console.error('Error processing incoming WhatsApp message:', err);
				}
			}
		}
	}

	return new Response('EVENT_RECEIVED', { status: 200 });
};

/**
 * Helper to process individual incoming message and send reply via WhatsApp API
 */
async function handleIncomingMessage(msg: WhatsAppIncomingMessage, contactName: string) {
	const waNumber = msg.from;
	let text = '';
	let messageType: 'text' | 'button_reply' | 'list_reply' = 'text';
	let buttonId: string | undefined;

	if (msg.type === 'text' && msg.text) {
		text = msg.text.body;
		messageType = 'text';
	} else if (msg.type === 'interactive' && msg.interactive) {
		const interactive = msg.interactive;
		if (interactive.type === 'button_reply' && interactive.button_reply) {
			text = interactive.button_reply.title;
			buttonId = interactive.button_reply.id;
			messageType = 'button_reply';
		} else if (interactive.type === 'list_reply' && interactive.list_reply) {
			text = interactive.list_reply.title;
			buttonId = interactive.list_reply.id;
			messageType = 'list_reply';
		}
	} else {
		// Ignore unsupported message types for now
		return;
	}

	// Send message to the engine
	const result = await processMessage({
		message: text,
		messageType,
		buttonId,
		whatsappNumber: waNumber,
		contactName
	});

	// Send reply back to WhatsApp
	if (result.list) {
		await sendListMessage(
			waNumber,
			result.text,
			result.list.buttonText,
			result.list.sections
		);
	} else if (result.buttons && result.buttons.length > 0) {
		await sendButtonMessage(
			waNumber,
			result.text,
			result.buttons
		);
	} else {
		await sendTextMessage(waNumber, result.text);
	}

	// Trigger advisor takeover notification if marked for transfer
	const ADVISOR_WHATSAPP_NUMBER = process.env.ADVISOR_WHATSAPP_NUMBER || '';
	if (result.shouldTransfer && ADVISOR_WHATSAPP_NUMBER) {
		const advisorAlert = `📢 *ALERTA DE TRASPASO EN VIVO*\n\n` +
			`Un cliente solicita atención humana en el Chatbot:\n` +
			`• *WhatsApp:* https://wa.me/${waNumber}\n` +
			`• *Nombre:* ${result.leadUpdate?.name || contactName || 'Desconocido'}\n` +
			`• *Empresa:* ${result.leadUpdate?.company || 'No especificada'}\n` +
			`• *Necesidad:* ${result.leadUpdate?.mainNeed || 'No especificada'}\n\n` +
			`⚠️ _Por favor, entra al panel o contáctalo directamente para continuar._`;
		
		await sendTextMessage(ADVISOR_WHATSAPP_NUMBER, advisorAlert);
	}
}
