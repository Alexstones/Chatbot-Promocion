import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { processMessage } from '$lib/server/chatbot/engine';

/**
 * Send a message manually/programmatically to the engine and get the response (great for testing or custom integrations)
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		let body: any = {};
		try {
			body = await request.json();
		} catch (e) {
			// Body might be empty or raw text
		}
		const { message, whatsappNumber, contactName, messageType, buttonId } = body;

		if (!message || !whatsappNumber) {
			return json({ error: 'message and whatsappNumber are required' }, { status: 400 });
		}

		const result = await processMessage({
			message,
			whatsappNumber,
			contactName: contactName || 'Usuario Web',
			messageType: messageType || 'text',
			buttonId
		});

		// Trigger simulated advisor takeover notification
		const ADVISOR_WHATSAPP_NUMBER = process.env.ADVISOR_WHATSAPP_NUMBER || '';
		if (result.shouldTransfer && ADVISOR_WHATSAPP_NUMBER) {
			console.log(`📢 [SIMULATION] Live Takeover Notification sent to Advisor (${ADVISOR_WHATSAPP_NUMBER}):`, {
				client: whatsappNumber,
				name: result.leadUpdate?.name || contactName || 'Desconocido',
				company: result.leadUpdate?.company || 'No especificada',
				need: result.leadUpdate?.mainNeed || 'No especificada'
			});
		}

		return json({ success: true, result });
	} catch (err: any) {
		console.error('Error in send API route:', err);
		return json({ error: err.message || 'Internal server error' }, { status: 500 });
	}
};
