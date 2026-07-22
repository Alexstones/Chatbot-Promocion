import type { LeadData, ChatResponse } from '$lib/types/chat';
import { updateLead, updateLeadScore } from '$lib/server/supabase';

// Fields to capture, in priority order
const CAPTURE_FIELDS: Array<{
  key: keyof LeadData;
  dbField: string;
  question: string;
  required: boolean;
}> = [
  {
    key: 'name',
    dbField: 'name',
    question: '¿Cuál es tu nombre?',
    required: true
  },
  {
    key: 'company',
    dbField: 'company',
    question: '¿Cuál es el nombre de tu empresa?',
    required: true
  },
  {
    key: 'city',
    dbField: 'city',
    question: '¿En qué ciudad te encuentras?',
    required: true
  },
  {
    key: 'email',
    dbField: 'email',
    question: '¿Cuál es tu correo electrónico?',
    required: false
  },
  {
    key: 'businessType',
    dbField: 'business_type',
    question: '¿A qué se dedica tu empresa?',
    required: true
  },
  {
    key: 'mainNeed',
    dbField: 'main_need',
    question: '¿Cuál es el proceso principal que deseas automatizar?',
    required: true
  }
];

/**
 * Check what lead data is missing and ask for the next field
 */
export function getNextMissingField(
  currentData: Partial<LeadData>
): { field: typeof CAPTURE_FIELDS[number]; allCollected: boolean } | null {
  for (const field of CAPTURE_FIELDS) {
    if (field.required && !currentData[field.key]) {
      return { field, allCollected: false };
    }
  }
  return null; // All required fields collected
}

/**
 * Process lead data capture step by step
 */
export async function processLeadCapture(
  whatsappNumber: string,
  message: string,
  currentData: Partial<LeadData>,
  currentStep: string | null
): Promise<ChatResponse> {
  // If we're capturing a specific field, save the answer
  if (currentStep) {
    const fieldKey = currentStep.replace('capture_', '') as keyof LeadData;
    currentData[fieldKey] = message.trim() as any;

    // Save to database
    const dbField = CAPTURE_FIELDS.find(f => f.key === fieldKey)?.dbField;
    if (dbField) {
      await updateLead(whatsappNumber, { [dbField]: message.trim() });
    }
  }

  // Check for next missing field
  const nextMissing = getNextMissingField(currentData);

  if (!nextMissing) {
    // All data collected - show summary and options
    await updateLeadScore(whatsappNumber, 'hot');
    
    return {
      text: `✅ *Perfecto, tengo toda la información necesaria.*\n\n` +
        `📋 *Resumen:*\n` +
        `• Nombre: ${currentData.name || 'No proporcionado'}\n` +
        `• Empresa: ${currentData.company || 'No proporcionado'}\n` +
        `• Ciudad: ${currentData.city || 'No proporcionada'}\n` +
        `• Tipo de negocio: ${currentData.businessType || 'No proporcionado'}\n` +
        `• Necesidad principal: ${currentData.mainNeed || 'No proporcionada'}\n\n` +
        `Con esta información, un asesor puede preparar una propuesta personalizada.\n\n` +
        `¿Qué prefieres?`,
      buttons: [
        { id: 'close_quote', title: 'Recibir cotización' },
        { id: 'close_demo', title: 'Solicitar demo' },
        { id: 'close_advisor', title: 'Hablar con asesor' }
      ],
      newFlow: 'LEAD_CAPTURE',
      newStep: 'complete',
      leadUpdate: currentData
    };
  }

  // Ask for next field
  return {
    text: nextMissing.field.question,
    newFlow: 'LEAD_CAPTURE',
    newStep: `capture_${String(nextMissing.field.key)}`,
    leadUpdate: currentData
  };
}

/**
 * Calculate lead score based on collected data and behavior
 */
export function calculateLeadScore(data: Partial<LeadData>, messageCount: number): 'cold' | 'warm' | 'hot' {
  let score = 0;

  if (data.name) score += 1;
  if (data.company) score += 2;
  if (data.email) score += 1;
  if (data.city) score += 1;
  if (data.businessType) score += 2;
  if (data.mainNeed) score += 2;
  if (data.budget) score += 3;
  if (data.vehicleCount) score += 2;
  if (data.implementationDate) score += 3;
  
  // More messages = more engagement
  if (messageCount > 10) score += 2;
  if (messageCount > 20) score += 2;

  if (score >= 10) return 'hot';
  if (score >= 5) return 'warm';
  return 'cold';
}

/**
 * Generate the commercial closing message
 */
export function generateClosingMessage(currentData: Partial<LeadData>): ChatResponse {
  const missingFields = CAPTURE_FIELDS.filter(f => f.required && !currentData[f.key]);
  
  if (missingFields.length === 0) {
    return {
      text: `Por lo que me has contado, un chatbot podría ayudarte a automatizar parte de la atención, responder preguntas frecuentes y capturar clientes interesados.\n\n` +
        `Ya tengo tus datos, ¿te gustaría recibir una propuesta?`,
      buttons: [
        { id: 'close_quote', title: 'Recibir cotización' },
        { id: 'close_demo', title: 'Solicitar demo' },
        { id: 'close_advisor', title: 'Hablar con asesor' }
      ],
      newFlow: 'COMMERCIAL',
      newStep: 'closing'
    };
  }

  return {
    text: `Por lo que me has contado, un chatbot podría ayudarte a automatizar parte de la atención, responder preguntas frecuentes y capturar clientes interesados.\n\n` +
      `Para preparar una propuesta personalizada necesito algunos datos.\n\n` +
      missingFields[0].question,
    newFlow: 'LEAD_CAPTURE',
    newStep: `capture_${String(missingFields[0].key)}`,
    leadUpdate: currentData
  };
}
