import type { Intent, ChatContext, ChatResponse } from '$lib/types/chat';
import type { ConversationFlow } from '$lib/types/database';
import {
  WELCOME_MESSAGE,
  WHAT_IS_CHATBOT,
  CHATBOT_FUNCTIONS,
  INTEGRATIONS_INFO,
  AI_INFO,
  WHATSAPP_INFO
} from '$lib/data/knowledge-base';
import { GPS_INTRO, GPS_FUNCTIONS_DETAIL, GPS_PLATFORM_FEATURES, GPS_SUPPORT_QUESTIONS } from '$lib/data/gps-demo';
import { BUSINESS_DEMOS } from '$lib/data/business-demos';
import {
  MAIN_MENU,
  GPS_DEMO_MENU,
  FUNCTIONS_MENU,
  BUSINESS_TYPE_MENU,
  CLOSE_OPTIONS_MENU
} from '$lib/data/menu';
import { processLeadCapture, generateClosingMessage } from './leadCapture';
import { generateBusinessDemo, generateResponse } from '$lib/server/deepseek';
import { SYSTEM_PROMPT } from '$lib/data/knowledge-base';

/**
 * Handle the response based on current flow and detected intent
 */
export async function handleFlow(
  intent: Intent,
  context: ChatContext,
  userMessage: string
): Promise<ChatResponse> {
  const { currentFlow, currentStep } = context;

  // If in GPS quote flow steps, continue the questionnaire
  if (currentFlow === 'GPS_QUOTE' && currentStep && intent !== 'GREETING' && intent !== 'TALK_ADVISOR') {
    if (currentStep === 'vehicle_type') {
      if (userMessage.toLowerCase().includes('flotilla') || userMessage.toLowerCase().includes('empresa') || userMessage.toLowerCase().includes('flota')) {
        return handleGpsFleet(context, userMessage);
      } else {
        // Particular vehicle
        return {
          text: '🚗 Para un vehículo particular, te recomendamos nuestro Plan Seguridad Básica con rastreo 24h, apagado remoto y alertas a tu celular.\n\n¿Te gustaría recibir una cotización formal o agendar una llamada con un asesor?',
          buttons: [
            { id: 'menu_quote', title: 'Recibir cotización' },
            { id: 'menu_advisor', title: 'Hablar con asesor' },
            { id: 'btn_back_menu', title: 'Menú principal' }
          ],
          newFlow: 'GPS_QUOTE',
          newStep: 'particular_suggested'
        };
      }
    }
    if (currentStep === 'fleet_count') {
      return handleGpsFleet(context, userMessage);
    }
    if (currentStep === 'fleet_features') {
      // Completed questionnaire -> go to lead capture for proposal
      return generateClosingMessage(context.leadData);
    }
  }

  // If in lead capture flow, continue capture process
  if (currentFlow === 'LEAD_CAPTURE' && currentStep && currentStep.startsWith('capture_') && intent !== 'GREETING' && intent !== 'TALK_ADVISOR') {
    return processLeadCapture(
      context.whatsappNumber,
      userMessage,
      context.leadData,
      currentStep
    );
  }

  // Priority intents that override any flow
  if (intent === 'TALK_ADVISOR') {
    return handleTalkAdvisor(context);
  }

  if (intent === 'FAREWELL') {
    return handleFarewell(context);
  }

  // Route based on intent
  switch (intent) {
    case 'GREETING':
      return handleWelcome();

    case 'WHAT_IS_CHATBOT':
      return handleWhatIsChatbot();

    case 'GPS_DEMO':
      return handleGpsDemo();

    case 'GPS_QUOTE':
    case 'GPS_PROTECT_VEHICLE':
      return handleGpsQuoteStart(context);

    case 'GPS_FLEET':
      return handleGpsFleet(context, userMessage);

    case 'GPS_FUNCTIONS':
      return handleGpsFunctions();

    case 'GPS_DEMO_REQUEST':
      return handleGpsDemoRequest(context);

    case 'ALL_FUNCTIONS':
      return handleAllFunctions();

    case 'FUNCTIONS_ATTENTION':
      return handleFunctionCategory('attention');
    case 'FUNCTIONS_SALES':
      return handleFunctionCategory('sales');
    case 'FUNCTIONS_QUOTES':
      return handleFunctionCategory('quotes');
    case 'FUNCTIONS_APPOINTMENTS':
      return handleFunctionCategory('appointments');
    case 'FUNCTIONS_CATALOG':
      return handleFunctionCategory('catalog');
    case 'FUNCTIONS_FOLLOWUP':
      return handleFunctionCategory('followup');
    case 'FUNCTIONS_SUPPORT':
      return handleFunctionCategory('support');
    case 'FUNCTIONS_ADMIN':
      return handleFunctionCategory('admin');

    case 'OTHER_BUSINESS':
      return handleOtherBusiness();

    case 'BUSINESS_CLINIC':
    case 'BUSINESS_MEDICAL_EQUIPMENT':
    case 'BUSINESS_REAL_ESTATE':
    case 'BUSINESS_STORE':
    case 'BUSINESS_WORKSHOP':
    case 'BUSINESS_RESTAURANT':
    case 'BUSINESS_SCHOOL':
    case 'BUSINESS_SECURITY':
    case 'BUSINESS_PROFESSIONAL':
    case 'BUSINESS_OTHER':
      return handleBusinessDemo(intent, userMessage, context);

    case 'CREATE_DEMO':
      return handleCreateDemo(context);

    case 'INTEGRATIONS':
      return handleIntegrations();

    case 'QUOTE_REQUEST':
    case 'PRICING':
      return handleQuoteRequest(context);

    case 'SUPPORT':
      return handleSupport();

    case 'WHATSAPP_INFO':
      return handleWhatsAppInfo();

    case 'AI_INFO':
      return handleAiInfo();

    case 'LEAD_DATA':
      return handleLeadData(context, userMessage);

    case 'PURCHASE_INTENT':
      return handlePurchaseIntent(context);

    case 'PRICE_OBJECTION':
      return handlePriceObjection();

    case 'COMPARISON':
      return handleComparison(context, userMessage);

    case 'FREE_TEXT':
    default:
      return handleFreeText(context, userMessage);
  }
}

// ==================== HANDLERS ====================

function handleWelcome(): ChatResponse {
  return {
    text: WELCOME_MESSAGE,
    list: MAIN_MENU.type === 'list' ? {
      buttonText: MAIN_MENU.buttonText || 'Ver opciones',
      sections: MAIN_MENU.sections || []
    } : undefined,
    newFlow: 'WELCOME',
    newStep: 'presented'
  };
}

function handleWhatIsChatbot(): ChatResponse {
  return {
    text: WHAT_IS_CHATBOT,
    buttons: [
      { id: 'menu_gps_demo', title: 'Ver ejemplo GPS' },
      { id: 'menu_functions', title: 'Ver funciones' },
      { id: 'menu_quote', title: 'Solicitar cotización' }
    ],
    newFlow: 'INFORMATIVE',
    newStep: 'what_is_chatbot'
  };
}

function handleGpsDemo(): ChatResponse {
  return {
    text: GPS_INTRO,
    list: GPS_DEMO_MENU.type === 'list' ? {
      buttonText: GPS_DEMO_MENU.buttonText || 'Ver opciones',
      sections: GPS_DEMO_MENU.sections || []
    } : undefined,
    buttons: GPS_DEMO_MENU.type === 'buttons' ? GPS_DEMO_MENU.buttons : undefined,
    newFlow: 'GPS_DEMO',
    newStep: 'intro'
  };
}

function handleGpsQuoteStart(context: ChatContext): ChatResponse {
  return {
    text: '🚗 Para recomendarte un servicio GPS adecuado, necesito conocer un poco sobre lo que deseas proteger.\n\n¿El servicio es para un vehículo particular o para una flotilla?',
    buttons: [
      { id: 'gps_protect', title: 'Vehículo particular' },
      { id: 'gps_fleet', title: 'Flotilla' }
    ],
    newFlow: 'GPS_QUOTE',
    newStep: 'vehicle_type'
  };
}

function handleGpsFleet(context: ChatContext, message: string): ChatResponse {
  // Check if they already mentioned vehicle count
  const countMatch = message.match(/(\d+)/i);
  if (countMatch) {
    const count = parseInt(countMatch[1]);
    return {
      text: `Para una flotilla de ${count} unidades, el sistema podría ayudarte a revisar ubicación en tiempo real, recorridos, velocidad, paradas, entradas y salidas de zonas, además de generar reportes de conducción.\n\n¿También necesitas funciones como apagado remoto, botón de pánico o monitoreo las 24 horas?`,
      buttons: [
        { id: 'gps_yes_advanced', title: 'Sí, las necesito' },
        { id: 'gps_basic_only', title: 'Solo rastreo básico' },
        { id: 'gps_more_info', title: 'Más información' }
      ],
      newFlow: 'GPS_QUOTE',
      newStep: 'fleet_features',
      flowData: { ...context.flowData, vehicleCount: count },
      leadUpdate: { vehicleCount: count }
    };
  }

  return {
    text: 'Perfecto, para una flotilla. ¿Cuántas unidades deseas monitorear aproximadamente?',
    newFlow: 'GPS_QUOTE',
    newStep: 'fleet_count'
  };
}

function handleGpsFunctions(): ChatResponse {
  const featuresText = GPS_PLATFORM_FEATURES.map(f => `• ${f}`).join('\n');
  return {
    text: `📡 *Funciones de la plataforma GPS:*\n\n${featuresText}\n\n¿Te gustaría conocer más detalles sobre alguna función o solicitar una demostración?`,
    buttons: [
      { id: 'gps_demo_request', title: 'Solicitar demo' },
      { id: 'gps_quote', title: 'Cotizar' },
      { id: 'btn_back_menu', title: 'Menú principal' }
    ],
    newFlow: 'GPS_DEMO',
    newStep: 'functions_shown'
  };
}

function handleGpsDemoRequest(context: ChatContext): ChatResponse {
  return handleGpsDemo();
}

function handleAllFunctions(): ChatResponse {
  return {
    text: '🤖 *El chatbot puede ayudarte en diferentes áreas:*\n\nSelecciona la categoría que te interese para conocer más detalles.',
    list: FUNCTIONS_MENU.type === 'list' ? {
      buttonText: FUNCTIONS_MENU.buttonText || 'Ver categorías',
      sections: FUNCTIONS_MENU.sections || []
    } : undefined,
    newFlow: 'INFORMATIVE',
    newStep: 'functions_menu'
  };
}

function handleFunctionCategory(category: string): ChatResponse {
  const categoryData = CHATBOT_FUNCTIONS[category as keyof typeof CHATBOT_FUNCTIONS];
  if (!categoryData) {
    return {
      text: 'No encontré esa categoría. ¿Te gustaría ver todas las funciones disponibles?',
      buttons: [
        { id: 'menu_functions', title: 'Ver funciones' },
        { id: 'btn_back_menu', title: 'Menú principal' }
      ]
    };
  }

  return {
    text: `${categoryData.emoji} *${categoryData.name}*\n\n${categoryData.capabilities.map(i => `• ${i}`).join('\n')}\n\n¿Te gustaría conocer otra categoría o solicitar una demostración?`,
    buttons: [
      { id: 'menu_functions', title: 'Otra categoría' },
      { id: 'menu_quote', title: 'Solicitar cotización' },
      { id: 'btn_back_menu', title: 'Menú principal' }
    ],
    newFlow: 'INFORMATIVE',
    newStep: `function_${category}`
  };
}

function handleOtherBusiness(): ChatResponse {
  return {
    text: '🏢 *Tenemos ejemplos para diferentes tipos de negocio.*\n\nSelecciona el que se acerque más al tuyo para ver una demostración personalizada:',
    list: BUSINESS_TYPE_MENU.type === 'list' ? {
      buttonText: BUSINESS_TYPE_MENU.buttonText || 'Ver negocios',
      sections: BUSINESS_TYPE_MENU.sections || []
    } : undefined,
    newFlow: 'BUSINESS_DEMO',
    newStep: 'select_type'
  };
}

async function handleBusinessDemo(intent: Intent, message: string, context: ChatContext): Promise<ChatResponse> {
  // Map intent to business key
  const intentToKey: Record<string, string> = {
    'BUSINESS_CLINIC': 'clinic',
    'BUSINESS_MEDICAL_EQUIPMENT': 'medical_equipment',
    'BUSINESS_REAL_ESTATE': 'real_estate',
    'BUSINESS_STORE': 'store',
    'BUSINESS_WORKSHOP': 'workshop',
    'BUSINESS_RESTAURANT': 'restaurant',
    'BUSINESS_SCHOOL': 'school',
    'BUSINESS_SECURITY': 'security',
    'BUSINESS_PROFESSIONAL': 'professional',
    'BUSINESS_OTHER': 'other'
  };

  const key = intentToKey[intent] || 'other';
  const demo = BUSINESS_DEMOS[key];

  if (demo && key !== 'other') {
    // Format the conversation example
    const convoExample = demo.exampleConversation
      .map(m => m.role === 'client' ? `👤 *Cliente:* ${m.message}` : `🤖 *Bot:* ${m.message}`)
      .join('\n\n');

    return {
      text: `${demo.emoji} *Chatbot para ${demo.name}*\n\n${demo.description}\n\n*Lo que puede hacer:*\n${demo.capabilities.map(c => `• ${c}`).join('\n')}\n\n*Ejemplo de conversación:*\n\n${convoExample}\n\n*Datos que recopilaría:*\n${demo.dataToCollect.map(d => `• ${d}`).join('\n')}\n\n¿Te gustaría ver una demostración más detallada para tu negocio?`,
      buttons: [
        { id: 'menu_create_demo', title: 'Demo para mi negocio' },
        { id: 'menu_quote', title: 'Solicitar cotización' },
        { id: 'btn_back_menu', title: 'Menú principal' }
      ],
      newFlow: 'BUSINESS_DEMO',
      newStep: `shown_${key}`,
      leadUpdate: { businessType: demo.name }
    };
  }

  // For 'other' or unknown business - use AI to generate demo
  const aiDemo = await generateBusinessDemo(message, 'El cliente quiere un chatbot para su negocio');
  return {
    text: aiDemo + '\n\n¿Te gustaría recibir una propuesta personalizada?',
    buttons: [
      { id: 'menu_quote', title: 'Solicitar cotización' },
      { id: 'menu_advisor', title: 'Hablar con asesor' },
      { id: 'btn_back_menu', title: 'Menú principal' }
    ],
    newFlow: 'BUSINESS_DEMO',
    newStep: 'ai_demo_shown'
  };
}

async function handleCreateDemo(context: ChatContext): Promise<ChatResponse> {
  if (context.leadData.businessType) {
    // We already know the business type, generate demo
    const aiDemo = await generateBusinessDemo(
      context.leadData.businessType,
      `Empresa: ${context.leadData.company || 'No especificada'}. Necesidad: ${context.leadData.mainNeed || 'No especificada'}`
    );
    return {
      text: `🎯 *Demostración personalizada para ${context.leadData.businessType}:*\n\n${aiDemo}\n\n¿Qué te parece? ¿Te gustaría recibir una propuesta?`,
      buttons: [
        { id: 'menu_quote', title: 'Solicitar cotización' },
        { id: 'menu_advisor', title: 'Hablar con asesor' },
        { id: 'btn_back_menu', title: 'Menú principal' }
      ],
      newFlow: 'BUSINESS_DEMO',
      newStep: 'custom_demo_shown'
    };
  }

  return {
    text: '🎯 Puedo crear una demostración personalizada para tu negocio.\n\nPrimero dime: *¿A qué se dedica tu empresa?*',
    newFlow: 'BUSINESS_DEMO',
    newStep: 'ask_business_type'
  };
}

function handleIntegrations(): ChatResponse {
  return {
    text: INTEGRATIONS_INFO,
    buttons: [
      { id: 'menu_quote', title: 'Solicitar cotización' },
      { id: 'menu_functions', title: 'Ver funciones' },
      { id: 'btn_back_menu', title: 'Menú principal' }
    ],
    newFlow: 'INFORMATIVE',
    newStep: 'integrations'
  };
}

function handleQuoteRequest(context: ChatContext): ChatResponse {
  return generateClosingMessage(context.leadData);
}

function handleSupport(): ChatResponse {
  const supportItems = GPS_SUPPORT_QUESTIONS.map(q => `• ${q}`).join('\n');
  return {
    text: `🔧 *Soporte técnico*\n\nPuedo ayudarte con preguntas básicas como:\n\n${supportItems}\n\nSi necesitas atención especializada, puedo transferirte a un técnico.\n\n¿Cuál es tu consulta?`,
    buttons: [
      { id: 'menu_advisor', title: 'Hablar con soporte' },
      { id: 'btn_back_menu', title: 'Menú principal' }
    ],
    newFlow: 'INFORMATIVE',
    newStep: 'support'
  };
}

function handleWhatsAppInfo(): ChatResponse {
  return {
    text: WHATSAPP_INFO,
    buttons: [
      { id: 'menu_functions', title: 'Ver funciones' },
      { id: 'menu_quote', title: 'Solicitar cotización' },
      { id: 'btn_back_menu', title: 'Menú principal' }
    ],
    newFlow: 'INFORMATIVE',
    newStep: 'whatsapp_info'
  };
}

function handleAiInfo(): ChatResponse {
  return {
    text: AI_INFO,
    buttons: [
      { id: 'menu_gps_demo', title: 'Ver ejemplo GPS' },
      { id: 'menu_quote', title: 'Solicitar cotización' },
      { id: 'btn_back_menu', title: 'Menú principal' }
    ],
    newFlow: 'INFORMATIVE',
    newStep: 'ai_info'
  };
}

function handleLeadData(context: ChatContext, message: string): ChatResponse {
  // The intent detector already extracted data, so continue the capture flow
  return generateClosingMessage(context.leadData);
}

function handlePurchaseIntent(context: ChatContext): ChatResponse {
  return generateClosingMessage(context.leadData);
}

function handlePriceObjection(): ChatResponse {
  return {
    text: '💡 Entiendo tu preocupación por el precio. La inversión en un chatbot se recupera rápidamente al:\n\n' +
      '• Atender clientes las 24 horas sin contratar personal adicional\n' +
      '• Capturar prospectos que actualmente se pierden\n' +
      '• Automatizar procesos que consumen tiempo de tu equipo\n' +
      '• Mejorar la experiencia del cliente\n\n' +
      'Cada solución se adapta al tamaño y necesidades de tu empresa. ¿Te gustaría conocer las opciones disponibles?',
    buttons: [
      { id: 'menu_quote', title: 'Ver opciones' },
      { id: 'menu_advisor', title: 'Hablar con asesor' },
      { id: 'btn_back_menu', title: 'Menú principal' }
    ],
    newFlow: 'COMMERCIAL',
    newStep: 'price_objection'
  };
}

async function handleComparison(context: ChatContext, message: string): Promise<ChatResponse> {
  const response = await generateResponse(
    SYSTEM_PROMPT,
    context.messageHistory.map(m => ({ role: m.role, content: m.content })),
    message
  );
  return {
    text: response,
    buttons: [
      { id: 'menu_quote', title: 'Solicitar cotización' },
      { id: 'btn_back_menu', title: 'Menú principal' }
    ],
    newFlow: 'COMMERCIAL',
    newStep: 'comparison'
  };
}

function handleTalkAdvisor(context: ChatContext): ChatResponse {
  return {
    text: '👨‍💼 *Transferencia a un asesor*\n\n' +
      'Voy a notificar a un asesor para que se comunique contigo lo antes posible.\n\n' +
      (context.leadData.name
        ? `Tengo registrado tu nombre como *${context.leadData.name}*. `
        : '') +
      'El asesor podrá ver el historial de nuestra conversación para darte una atención más rápida.\n\n' +
      '⏳ Tiempo estimado de respuesta: *menos de 1 hora* en horario laboral.\n\n' +
      'Mientras tanto, ¿hay algo más en lo que pueda ayudarte?',
    newFlow: 'TRANSFER',
    newStep: 'transferred',
    shouldTransfer: true
  };
}

function handleFarewell(context: ChatContext): ChatResponse {
  const name = context.leadData.name ? `, ${context.leadData.name}` : '';
  return {
    text: `👋 ¡Gracias por tu interés${name}! Fue un gusto atenderte.\n\n` +
      'Si en el futuro necesitas información sobre chatbots o automatización, no dudes en escribirme.\n\n' +
      '¡Que tengas un excelente día! 🚀',
    newFlow: 'WELCOME',
    newStep: null
  };
}

async function handleFreeText(context: ChatContext, message: string): Promise<ChatResponse> {
  // Use DeepSeek for free-form conversation
  const response = await generateResponse(
    SYSTEM_PROMPT,
    context.messageHistory.map(m => ({ role: m.role, content: m.content })),
    message
  );

  return {
    text: response,
    buttons: [
      { id: 'btn_more_info', title: 'Más información' },
      { id: 'menu_quote', title: 'Solicitar cotización' },
      { id: 'btn_back_menu', title: 'Menú principal' }
    ],
    newFlow: 'FREE_CHAT'
  };
}
