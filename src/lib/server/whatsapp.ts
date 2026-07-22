import {
	WHATSAPP_ACCESS_TOKEN,
	WHATSAPP_PHONE_NUMBER_ID
} from '$env/static/private';

import type {
	WhatsAppTextMessage,
	WhatsAppButtonMessage,
	WhatsAppListMessage,
	WhatsAppTemplateMessage,
	WhatsAppDocumentMessage,
	WhatsAppImageMessage,
	MenuButton,
	ListSection
} from '$lib/types/whatsapp';

const API_VERSION = 'v22.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}`;

/**
 * Send a raw message payload to WhatsApp Cloud API
 */
async function sendMessage(
	payload: WhatsAppOutgoingMessage
): Promise<boolean> {
	if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
		console.warn('⚠️ WhatsApp credentials not configured');
		return false;
	}

	try {
		const response = await fetch(`${BASE_URL}/messages`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`
			},
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			const errorData = await response.text();
			console.error('WhatsApp API error:', response.status, errorData);
			return false;
		}

		return true;
	} catch (error) {
		console.error('WhatsApp send failed:', error);
		return false;
	}
}

/**
 * Send a plain text message
 */
export async function sendTextMessage(to: string, text: string): Promise<boolean> {
	// WhatsApp has a 4096 character limit per message
	if (text.length > 4096) {
		// Split into multiple messages
		const chunks = splitText(text, 4000);
		for (const chunk of chunks) {
			const success = await sendMessage({
				messaging_product: 'whatsapp',
				to,
				type: 'text',
				text: { body: chunk }
			});
			if (!success) return false;
			// Small delay between messages to preserve order
			await new Promise((r) => setTimeout(r, 500));
		}
		return true;
	}

	return sendMessage({
		messaging_product: 'whatsapp',
		to,
		type: 'text',
		text: { body: text }
	});
}

/**
 * Send an interactive button message (max 3 buttons)
 */
export async function sendButtonMessage(
	to: string,
	body: string,
	buttons: MenuButton[],
	header?: string,
	footer?: string
): Promise<boolean> {
	if (buttons.length > 3) {
		console.warn('WhatsApp buttons max is 3, truncating');
		buttons = buttons.slice(0, 3);
	}

	// Truncate button titles to 20 chars (WhatsApp limit)
	const formattedButtons = buttons.map((b) => ({
		type: 'reply' as const,
		reply: {
			id: b.id,
			title: b.title.substring(0, 20)
		}
	}));

	const interactive: WhatsAppButtonMessage['interactive'] = {
		type: 'button',
		body: { text: body },
		action: { buttons: formattedButtons }
	};

	if (header) {
		interactive.header = { type: 'text', text: header };
	}
	if (footer) {
		interactive.footer = { text: footer };
	}

	return sendMessage({
		messaging_product: 'whatsapp',
		to,
		type: 'interactive',
		interactive
	});
}

/**
 * Send an interactive list message (max 10 rows total)
 */
export async function sendListMessage(
	to: string,
	body: string,
	buttonText: string,
	sections: ListSection[],
	header?: string,
	footer?: string
): Promise<boolean> {
	// Truncate button text to 20 chars
	const truncatedButtonText = buttonText.substring(0, 20);

	// Truncate row titles to 24 chars and descriptions to 72 chars
	const formattedSections = sections.map((section) => ({
		title: section.title.substring(0, 24),
		rows: section.rows.map((row) => ({
			id: row.id,
			title: row.title.substring(0, 24),
			description: row.description?.substring(0, 72)
		}))
	}));

	const interactive: WhatsAppListMessage['interactive'] = {
		type: 'list',
		body: { text: body },
		action: {
			button: truncatedButtonText,
			sections: formattedSections
		}
	};

	if (header) {
		interactive.header = { type: 'text', text: header };
	}
	if (footer) {
		interactive.footer = { text: footer };
	}

	return sendMessage({
		messaging_product: 'whatsapp',
		to,
		type: 'interactive',
		interactive
	});
}

/**
 * Send a template message (for messages outside 24h window)
 */
export async function sendTemplateMessage(
	to: string,
	templateName: string,
	languageCode: string = 'es',
	parameters?: Array<{ type: 'text'; text: string }>
): Promise<boolean> {
	const template: WhatsAppTemplateMessage['template'] = {
		name: templateName,
		language: { code: languageCode }
	};

	if (parameters && parameters.length > 0) {
		template.components = [
			{
				type: 'body',
				parameters
			}
		];
	}

	return sendMessage({
		messaging_product: 'whatsapp',
		to,
		type: 'template',
		template
	});
}

/**
 * Send a document/PDF file message
 */
export async function sendDocumentMessage(
	to: string,
	documentUrl: string,
	filename: string,
	caption?: string
): Promise<boolean> {
	return sendMessage({
		messaging_product: 'whatsapp',
		to,
		type: 'document',
		document: {
			link: documentUrl,
			filename,
			caption
		}
	});
}

/**
 * Send an image file message
 */
export async function sendImageMessage(
	to: string,
	imageUrl: string,
	caption?: string
): Promise<boolean> {
	return sendMessage({
		messaging_product: 'whatsapp',
		to,
		type: 'image',
		image: {
			link: imageUrl,
			caption
		}
	});
}

/**
 * Mark a message as read
 */
export async function markAsRead(messageId: string): Promise<void> {
	if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) return;

	try {
		await fetch(`${BASE_URL}/messages`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`
			},
			body: JSON.stringify({
				messaging_product: 'whatsapp',
				status: 'read',
				message_id: messageId
			})
		});
	} catch (error) {
		console.error('Error marking message as read:', error);
	}
}

/**
 * Split long text into chunks while preserving line breaks
 */
function splitText(text: string, maxLength: number): string[] {
	const chunks: string[] = [];
	const paragraphs = text.split('\n\n');
	let currentChunk = '';

	for (const paragraph of paragraphs) {
		if (currentChunk.length + paragraph.length + 2 > maxLength) {
			if (currentChunk) {
				chunks.push(currentChunk.trim());
				currentChunk = '';
			}
			// If a single paragraph exceeds max, split by sentences
			if (paragraph.length > maxLength) {
				const sentences = paragraph.split('. ');
				for (const sentence of sentences) {
					if (currentChunk.length + sentence.length + 2 > maxLength) {
						chunks.push(currentChunk.trim());
						currentChunk = '';
					}
					currentChunk += sentence + '. ';
				}
			} else {
				currentChunk = paragraph;
			}
		} else {
			currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
		}
	}

	if (currentChunk.trim()) {
		chunks.push(currentChunk.trim());
	}

	return chunks;
}
