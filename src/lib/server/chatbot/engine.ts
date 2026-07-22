import type { EngineInput, ChatResponse, ChatContext, LeadData } from '$lib/types/chat';
import type { Conversation, Lead, Message } from '$lib/types/database';
import {
	findOrCreateLead,
	findOrCreateConversation,
	getConversationHistory,
	saveMessage,
	updateConversation,
	updateLead
} from '$lib/server/supabase';
import { detectIntent, buttonIdToIntent } from './intents';
import { handleFlow } from './flows';
import { validateResponse } from './validator';

/**
 * Process an incoming message through the chatbot engine
 */
export async function processMessage(input: EngineInput): Promise<ChatResponse> {
	const { message, messageType, buttonId, whatsappNumber, contactName } = input;

	// 1. Load or create Lead and Conversation from Supabase
	const lead = await findOrCreateLead(whatsappNumber, contactName || undefined);
	const conversation = await findOrCreateConversation(whatsappNumber, lead.id);

	// If the conversation is transferred to a human, stop auto-responding
	if (conversation.is_transferred) {
		return {
			text: '🤖 _El chatbot está pausado mientras eres atendido por un asesor._',
			shouldTransfer: true
		};
	}

	// 2. Fetch conversation history for context
	const rawHistory = await getConversationHistory(conversation.id, 15);
	const messageHistory = rawHistory.map((m: Message) => ({
		role: (m.direction === 'inbound' ? 'user' : 'assistant') as 'user' | 'assistant',
		content: m.content
	}));

	// 3. Save incoming message to database
	await saveMessage({
		conversation_id: conversation.id,
		whatsapp_number: whatsappNumber,
		direction: 'inbound',
		content: message,
		message_type: messageType === 'text' ? 'text' : 'button',
		metadata: { buttonId }
	});

	// 4. Map or detect intent
	let intent = 'FREE_TEXT';
	let extractedData: Record<string, any> = {};

	if (messageType === 'button_reply' && buttonId) {
		intent = buttonIdToIntent(buttonId);
	} else if (messageType === 'list_reply' && buttonId) {
		intent = buttonIdToIntent(buttonId);
	} else {
		// Free text message, detect intent and extract entities
		const contextStr = `Flujo actual: ${conversation.current_flow}, Paso actual: ${conversation.current_step || 'ninguno'}`;
		const detection = await detectIntent(message, contextStr);
		intent = detection.intent;
		extractedData = detection.extractedData;
	}

	// 5. Update lead data with newly extracted details
	const leadData: Partial<LeadData> = {
		name: lead.name || '',
		company: lead.company || '',
		city: lead.city || '',
		phone: lead.whatsapp_number || '',
		email: lead.email || '',
		businessType: lead.business_type || '',
		productsServices: lead.products_services || '',
		vehicleCount: lead.vehicle_count || 0,
		vehicleType: lead.vehicle_type || '',
		mainNeed: lead.main_need || '',
		budget: lead.budget || '',
		requestedFunctions: lead.requested_functions || []
	};

	// Merge extracted data
	const mergedData = { ...leadData };
	for (const [key, val] of Object.entries(extractedData)) {
		if (val !== undefined && val !== null && val !== '') {
			mergedData[key as keyof LeadData] = val as any;
		}
	}

	// Save any updates to database
	const dbUpdate: Record<string, any> = {};
	if (extractedData.name && !lead.name) dbUpdate.name = extractedData.name;
	if (extractedData.company && !lead.company) dbUpdate.company = extractedData.company;
	if (extractedData.city && !lead.city) dbUpdate.city = extractedData.city;
	if (extractedData.email && !lead.email) dbUpdate.email = extractedData.email;
	if (extractedData.businessType && !lead.business_type) dbUpdate.business_type = extractedData.businessType;
	if (extractedData.vehicleCount && !lead.vehicle_count) dbUpdate.vehicle_count = extractedData.vehicleCount;
	if (extractedData.mainNeed && !lead.main_need) dbUpdate.main_need = extractedData.mainNeed;

	if (Object.keys(dbUpdate).length > 0) {
		await updateLead(whatsappNumber, dbUpdate);
	}

	// Create chatbot context for handlers
	const context: ChatContext = {
		conversationId: conversation.id,
		whatsappNumber,
		contactName: lead.name,
		currentFlow: conversation.current_flow,
		currentStep: conversation.current_step,
		flowData: (conversation.flow_data as Record<string, any>) || {},
		leadData: mergedData,
		messageHistory
	};

	// 6. Process message through flow managers
	const response = await handleFlow(intent as any, context, message);

	// 7. Sanitize/validate response
	response.text = validateResponse(response.text);

	// 8. Update conversation state in Supabase
	const convoUpdate: Record<string, any> = {};
	if (response.newFlow) convoUpdate.current_flow = response.newFlow;
	if (response.newStep !== undefined) convoUpdate.current_step = response.newStep;
	if (response.flowData) {
		convoUpdate.flow_data = {
			...context.flowData,
			...response.flowData
		};
	}
	if (response.shouldTransfer !== undefined) convoUpdate.is_transferred = response.shouldTransfer;

	await updateConversation(conversation.id, convoUpdate);

	// Update lead if leadUpdate details were returned by handler
	if (response.leadUpdate) {
		const finalDbUpdate: Record<string, any> = {};
		if (response.leadUpdate.name) finalDbUpdate.name = response.leadUpdate.name;
		if (response.leadUpdate.company) finalDbUpdate.company = response.leadUpdate.company;
		if (response.leadUpdate.city) finalDbUpdate.city = response.leadUpdate.city;
		if (response.leadUpdate.email) finalDbUpdate.email = response.leadUpdate.email;
		if (response.leadUpdate.businessType) finalDbUpdate.business_type = response.leadUpdate.businessType;
		if (response.leadUpdate.vehicleCount) finalDbUpdate.vehicle_count = response.leadUpdate.vehicleCount;
		if (response.leadUpdate.mainNeed) finalDbUpdate.main_need = response.leadUpdate.mainNeed;

		if (Object.keys(finalDbUpdate).length > 0) {
			await updateLead(whatsappNumber, finalDbUpdate);
		}
	}

	// 9. Save outgoing response to database
	await saveMessage({
		conversation_id: conversation.id,
		whatsapp_number: whatsappNumber,
		direction: 'outbound',
		content: response.text,
		message_type: response.list ? 'list' : response.buttons ? 'button' : 'text',
		intent_detected: intent
	});

	return response;
}
