export interface Lead {
	id: string;
	whatsapp_number: string;
	name: string | null;
	company: string | null;
	city: string | null;
	email: string | null;
	business_type: string | null;
	products_services: string | null;
	vehicle_count: number | null;
	vehicle_type: string | null;
	main_need: string | null;
	budget: string | null;
	implementation_date: string | null;
	requested_functions: string[] | null;
	lead_score: 'cold' | 'warm' | 'hot';
	channel: string;
	status: 'new' | 'contacted' | 'demo' | 'quoted' | 'closed' | 'lost';
	notes: string | null;
	created_at: string;
	updated_at: string;
}

export interface Conversation {
	id: string;
	lead_id: string | null;
	whatsapp_number: string;
	current_flow: ConversationFlow;
	current_step: string | null;
	flow_data: Record<string, any>;
	is_active: boolean;
	is_transferred: boolean;
	transferred_to: string | null;
	last_message_at: string;
	created_at: string;
}

export type ConversationFlow =
	| 'WELCOME'
	| 'INFORMATIVE'
	| 'GPS_DEMO'
	| 'GPS_QUOTE'
	| 'BUSINESS_DEMO'
	| 'COMMERCIAL'
	| 'QUOTE'
	| 'LEAD_CAPTURE'
	| 'TRANSFER'
	| 'FOLLOWUP'
	| 'FREE_CHAT';

export interface Message {
	id: string;
	conversation_id: string;
	whatsapp_number: string;
	direction: 'inbound' | 'outbound';
	content: string;
	message_type: 'text' | 'button' | 'list' | 'template';
	whatsapp_message_id: string | null;
	intent_detected: string | null;
	metadata: Record<string, any>;
	created_at: string;
}

export interface Quote {
	id: string;
	lead_id: string;
	conversation_id: string;
	business_type: string | null;
	requirements: string | null;
	vehicle_count: number | null;
	functions_needed: string[] | null;
	summary: string | null;
	status: 'pending' | 'sent' | 'accepted' | 'rejected';
	created_at: string;
}

export interface Database {
	public: {
		Tables: {
			leads: {
				Row: Lead;
				Insert: Partial<Lead> & { whatsapp_number: string };
				Update: Partial<Lead>;
			};
			conversations: {
				Row: Conversation;
				Insert: Partial<Conversation> & { whatsapp_number: string };
				Update: Partial<Conversation>;
			};
			messages: {
				Row: Message;
				Insert: Partial<Message> & {
					conversation_id: string;
					whatsapp_number: string;
					direction: string;
					content: string;
				};
				Update: Partial<Message>;
			};
			quotes: {
				Row: Quote;
				Insert: Partial<Quote> & { lead_id: string; conversation_id: string };
				Update: Partial<Quote>;
			};
		};
	};
}
