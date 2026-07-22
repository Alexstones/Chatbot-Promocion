import type { ConversationFlow } from './database';

export type Intent =
	| 'GREETING'
	| 'WHAT_IS_CHATBOT'
	| 'GPS_DEMO'
	| 'GPS_QUOTE'
	| 'GPS_PROTECT_VEHICLE'
	| 'GPS_FLEET'
	| 'GPS_FUNCTIONS'
	| 'GPS_DEMO_REQUEST'
	| 'ALL_FUNCTIONS'
	| 'FUNCTIONS_ATTENTION'
	| 'FUNCTIONS_SALES'
	| 'FUNCTIONS_QUOTES'
	| 'FUNCTIONS_APPOINTMENTS'
	| 'FUNCTIONS_CATALOG'
	| 'FUNCTIONS_FOLLOWUP'
	| 'FUNCTIONS_SUPPORT'
	| 'FUNCTIONS_ADMIN'
	| 'OTHER_BUSINESS'
	| 'BUSINESS_CLINIC'
	| 'BUSINESS_MEDICAL_EQUIPMENT'
	| 'BUSINESS_REAL_ESTATE'
	| 'BUSINESS_STORE'
	| 'BUSINESS_WORKSHOP'
	| 'BUSINESS_RESTAURANT'
	| 'BUSINESS_SCHOOL'
	| 'BUSINESS_SECURITY'
	| 'BUSINESS_PROFESSIONAL'
	| 'BUSINESS_OTHER'
	| 'CREATE_DEMO'
	| 'INTEGRATIONS'
	| 'QUOTE_REQUEST'
	| 'TALK_ADVISOR'
	| 'PRICING'
	| 'SUPPORT'
	| 'WHATSAPP_INFO'
	| 'AI_INFO'
	| 'LEAD_DATA'
	| 'PURCHASE_INTENT'
	| 'PRICE_OBJECTION'
	| 'COMPARISON'
	| 'FAREWELL'
	| 'FREE_TEXT';

export interface ChatContext {
	conversationId: string;
	whatsappNumber: string;
	contactName: string | null;
	currentFlow: ConversationFlow;
	currentStep: string | null;
	flowData: Record<string, any>;
	leadData: Partial<LeadData>;
	messageHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
}

export interface LeadData {
	name: string;
	company: string;
	city: string;
	phone: string;
	email: string;
	businessType: string;
	productsServices: string;
	vehicleCount: number;
	vehicleType: string;
	mainNeed: string;
	budget: string;
	implementationDate: string;
	requestedFunctions: string[];
	clientCount: string;
	sellerCount: string;
	attentionChannel: string;
}

export interface ChatResponse {
	text: string;
	buttons?: Array<{ id: string; title: string }>;
	list?: {
		buttonText: string;
		sections: Array<{
			title: string;
			rows: Array<{ id: string; title: string; description?: string }>;
		}>;
	};
	newFlow?: ConversationFlow;
	newStep?: string;
	flowData?: Record<string, any>;
	leadUpdate?: Partial<LeadData>;
	shouldTransfer?: boolean;
	quoteData?: {
		businessType: string;
		requirements: string;
		vehicleCount?: number;
		functionsNeeded?: string[];
		summary: string;
	};
}

export interface EngineInput {
	message: string;
	messageType: 'text' | 'button_reply' | 'list_reply';
	buttonId?: string;
	whatsappNumber: string;
	contactName?: string;
}
