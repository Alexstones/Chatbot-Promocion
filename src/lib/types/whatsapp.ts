// Incoming webhook payload
export interface WhatsAppWebhookPayload {
	object: string;
	entry: WhatsAppEntry[];
}

export interface WhatsAppEntry {
	id: string;
	changes: WhatsAppChange[];
}

export interface WhatsAppChange {
	value: WhatsAppChangeValue;
	field: string;
}

export interface WhatsAppChangeValue {
	messaging_product: string;
	metadata: {
		display_phone_number: string;
		phone_number_id: string;
	};
	contacts?: WhatsAppContact[];
	messages?: WhatsAppIncomingMessage[];
	statuses?: WhatsAppStatus[];
}

export interface WhatsAppContact {
	profile: { name: string };
	wa_id: string;
}

export interface WhatsAppIncomingMessage {
	from: string;
	id: string;
	timestamp: string;
	type:
		| 'text'
		| 'interactive'
		| 'image'
		| 'document'
		| 'audio'
		| 'video'
		| 'location'
		| 'button';
	text?: { body: string };
	interactive?: {
		type: 'button_reply' | 'list_reply';
		button_reply?: { id: string; title: string };
		list_reply?: { id: string; title: string; description?: string };
	};
	button?: { text: string; payload: string };
}

export interface WhatsAppStatus {
	id: string;
	status: 'sent' | 'delivered' | 'read' | 'failed';
	timestamp: string;
	recipient_id: string;
}

// Outgoing message types
export interface WhatsAppTextMessage {
	messaging_product: 'whatsapp';
	to: string;
	type: 'text';
	text: { body: string };
}

export interface WhatsAppButtonMessage {
	messaging_product: 'whatsapp';
	to: string;
	type: 'interactive';
	interactive: {
		type: 'button';
		header?: { type: 'text'; text: string };
		body: { text: string };
		footer?: { text: string };
		action: {
			buttons: Array<{
				type: 'reply';
				reply: { id: string; title: string };
			}>;
		};
	};
}

export interface WhatsAppListMessage {
	messaging_product: 'whatsapp';
	to: string;
	type: 'interactive';
	interactive: {
		type: 'list';
		header?: { type: 'text'; text: string };
		body: { text: string };
		footer?: { text: string };
		action: {
			button: string;
			sections: Array<{
				title: string;
				rows: Array<{
					id: string;
					title: string;
					description?: string;
				}>;
			}>;
		};
	};
}

export interface WhatsAppTemplateMessage {
	messaging_product: 'whatsapp';
	to: string;
	type: 'template';
	template: {
		name: string;
		language: { code: string };
		components?: Array<{
			type: 'header' | 'body';
			parameters: Array<{ type: 'text'; text: string }>;
		}>;
	};
}

export interface WhatsAppDocumentMessage {
	messaging_product: 'whatsapp';
	to: string;
	type: 'document';
	document: {
		link?: string;
		id?: string;
		filename?: string;
		caption?: string;
	};
}

export interface WhatsAppImageMessage {
	messaging_product: 'whatsapp';
	to: string;
	type: 'image';
	image: {
		link?: string;
		id?: string;
		caption?: string;
	};
}

export type WhatsAppOutgoingMessage =
	| WhatsAppTextMessage
	| WhatsAppButtonMessage
	| WhatsAppListMessage
	| WhatsAppTemplateMessage
	| WhatsAppDocumentMessage
	| WhatsAppImageMessage;

// Button helper
export interface MenuButton {
	id: string;
	title: string;
}

export interface ListRow {
	id: string;
	title: string;
	description?: string;
}

export interface ListSection {
	title: string;
	rows: ListRow[];
}
