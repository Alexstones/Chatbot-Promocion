import { DEEPSEEK_API_KEY } from '$env/static/private';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const MODEL = 'deepseek-chat';

export interface DeepSeekMessage {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

export interface DeepSeekResponse {
	id: string;
	choices: Array<{
		index: number;
		message: {
			role: string;
			content: string;
		};
		finish_reason: string;
	}>;
	usage: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
	};
}

/**
 * Send a chat completion request to DeepSeek API
 */
export async function chatCompletion(
	messages: DeepSeekMessage[],
	options: {
		temperature?: number;
		maxTokens?: number;
		jsonMode?: boolean;
	} = {}
): Promise<string> {
	const isLocalOllama = DEEPSEEK_API_URL.includes('localhost') || DEEPSEEK_API_URL.includes('127.0.0.1');

	if (!DEEPSEEK_API_KEY && !isLocalOllama) {
		console.warn('⚠️ DeepSeek API key not configured');
		return 'Lo siento, el servicio de inteligencia artificial no está disponible en este momento. Un asesor te contactará pronto.';
	}

	const body: Record<string, any> = {
		model: MODEL,
		messages,
		stream: false,
		temperature: options.temperature ?? 0.7,
		max_tokens: options.maxTokens ?? 1000
	};

	if (options.jsonMode) {
		body.response_format = { type: 'json_object' };
	}

	try {
		const headers: Record<string, string> = {
			'Content-Type': 'application/json'
		};

		if (DEEPSEEK_API_KEY) {
			headers['Authorization'] = `Bearer ${DEEPSEEK_API_KEY}`;
		}

		const response = await fetch(DEEPSEEK_API_URL, {
			method: 'POST',
			headers,
			body: JSON.stringify(body)
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('DeepSeek/Ollama API error:', response.status, errorText);
			
			// Fallback: If JSON mode, return mock JSON structure
			if (options.jsonMode) {
				return JSON.stringify({ intent: 'FREE_TEXT', confidence: 0.5, extractedData: {} });
			}
			return 'Disculpa, tuve un problema al procesar tu consulta con la IA. ¿Te gustaría ver un ejemplo de GPS o hablar con un asesor?';
		}

		const data: DeepSeekResponse = await response.json();
		return data.choices[0]?.message?.content || 'No pude generar una respuesta. ¿Podrías reformular tu pregunta?';
	} catch (error: any) {
		console.error('DeepSeek request failed:', error.message);
		if (options.jsonMode) {
			return JSON.stringify({ intent: 'FREE_TEXT', confidence: 0.5, extractedData: {} });
		}
		return 'Disculpa, el servicio de IA local (Ollama) no está respondiendo o el modelo no está descargado. Te recomiendo descargar el modelo usando: ollama run deepseek-r1';
	}
}

/**
 * Classify user intent using DeepSeek
 */
export async function classifyIntent(
	userMessage: string,
	conversationContext: string
): Promise<{ intent: string; confidence: number; extractedData: Record<string, any> }> {
	const systemPrompt = `Eres un clasificador de intenciones para un chatbot de automatización empresarial. 
Analiza el mensaje del usuario y responde SOLO en formato JSON con esta estructura:
{
  "intent": "INTENT_NAME",
  "confidence": 0.0-1.0,
  "extractedData": {}
}

INTENCIONES VÁLIDAS:
- GREETING: Saludo
- WHAT_IS_CHATBOT: Pregunta qué es un chatbot
- GPS_DEMO: Quiere ver demo GPS
- GPS_QUOTE: Quiere cotizar GPS
- GPS_PROTECT_VEHICLE: Proteger vehículo particular
- GPS_FLEET: Control de flotilla
- GPS_FUNCTIONS: Funciones del GPS
- GPS_DEMO_REQUEST: Solicitar demo de plataforma GPS
- ALL_FUNCTIONS: Todas las funciones del chatbot
- OTHER_BUSINESS: Ejemplos para otros negocios
- CREATE_DEMO: Crear demo para su empresa
- INTEGRATIONS: Integraciones disponibles
- QUOTE_REQUEST: Solicitar cotización
- TALK_ADVISOR: Hablar con asesor humano
- PRICING: Preguntar precios
- SUPPORT: Soporte técnico
- WHATSAPP_INFO: Info sobre WhatsApp
- AI_INFO: Info sobre inteligencia artificial
- LEAD_DATA: Está dando sus datos (nombre, empresa, teléfono, etc.)
- PURCHASE_INTENT: Intención alta de compra
- PRICE_OBJECTION: Objeción de precio
- COMPARISON: Comparación con otros servicios
- FAREWELL: Despedida
- FREE_TEXT: Texto libre que necesita IA para responder

DATOS A EXTRAER (si están presentes en el mensaje):
- name: Nombre del usuario
- company: Nombre de empresa
- city: Ciudad
- email: Correo electrónico
- businessType: Tipo de negocio
- vehicleCount: Número de vehículos
- vehicleType: Tipo de vehículos
- mainNeed: Necesidad principal
- budget: Presupuesto
- clientCount: Cantidad de clientes
- sellerCount: Cantidad de vendedores

Contexto de la conversación: ${conversationContext}`;

	const response = await chatCompletion(
		[
			{ role: 'system', content: systemPrompt },
			{ role: 'user', content: userMessage }
		],
		{ temperature: 0.3, jsonMode: true, maxTokens: 500 }
	);

	try {
		return JSON.parse(response);
	} catch {
		return { intent: 'FREE_TEXT', confidence: 0.5, extractedData: {} };
	}
}

/**
 * Generate a personalized business demo conversation
 */
export async function generateBusinessDemo(
	businessType: string,
	businessDetails: string
): Promise<string> {
	const systemPrompt = `Eres un asesor comercial de chatbots empresariales. Genera una demostración breve y convincente de cómo funcionaría un chatbot para el negocio del cliente.

La demostración debe incluir:
1. Un mensaje de un cliente ficticio del negocio
2. La respuesta que daría el chatbot
3. Los datos que recopilaría
4. La acción que realizaría
5. El beneficio para la empresa

Formato para WhatsApp (usa emojis, texto corto, listas con viñetas).
Mantén la respuesta entre 3-5 párrafos.
Todo en español.`;

	return chatCompletion(
		[
			{ role: 'system', content: systemPrompt },
			{
				role: 'user',
				content: `Genera una demostración de chatbot para: ${businessType}. Detalles: ${businessDetails}`
			}
		],
		{ temperature: 0.8, maxTokens: 800 }
	);
}

/**
 * Generate a free-form AI response with full context
 */
export async function generateResponse(
	systemPrompt: string,
	messages: DeepSeekMessage[],
	userMessage: string
): Promise<string> {
	const allMessages: DeepSeekMessage[] = [
		{ role: 'system', content: systemPrompt },
		...messages.slice(-10), // Keep last 10 messages for context
		{ role: 'user', content: userMessage }
	];

	return chatCompletion(allMessages, { temperature: 0.7, maxTokens: 800 });
}
