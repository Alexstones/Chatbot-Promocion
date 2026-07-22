import type { Intent } from '$lib/types/chat';
import { classifyIntent } from '$lib/server/deepseek';

// Keyword patterns for each intent
const INTENT_PATTERNS: Record<Intent, RegExp[]> = {
  GREETING: [
    /^hola$/i, /^buenos? (d[ií]as?|tardes?|noches?)$/i, /^hey$/i, /^qu[eé] tal$/i,
    /^saludos?$/i, /^holi$/i, /^buenas$/i
  ],
  WHAT_IS_CHATBOT: [
    /qu[eé] es un chatbot/i, /qu[eé] es.*bot/i, /c[oó]mo funciona.*chatbot/i,
    /para qu[eé] sirve.*chatbot/i, /qu[eé] hace.*chatbot/i
  ],
  GPS_DEMO: [
    /demo.*gps/i, /ejemplo.*gps/i, /ver.*gps/i, /gps.*demo/i,
    /rastreo.*satelital/i, /monitoreo.*vehic/i, /ejemplo.*rastreo/i
  ],
  GPS_QUOTE: [
    /cotiz.*gps/i, /precio.*gps/i, /cu[aá]nto.*gps/i, /costo.*gps/i,
    /cu[aá]nto.*instalar/i, /cu[aá]nto.*cuesta.*rastreo/i
  ],
  GPS_PROTECT_VEHICLE: [
    /proteger.*veh[ií]culo/i, /proteger.*carro/i, /proteger.*coche/i,
    /gps.*particular/i, /rastreo.*particular/i
  ],
  GPS_FLEET: [
    /flotilla/i, /flota/i, /camion/i, /unidades/i, /transporte/i,
    /control.*flot/i, /monitorear.*unidad/i
  ],
  GPS_FUNCTIONS: [
    /funciones.*gps/i, /caracter[ií]sticas.*gps/i, /qu[eé].*hace.*gps/i,
    /geocerca/i, /apagado.*remoto/i, /bot[oó]n.*p[aá]nico/i
  ],
  GPS_DEMO_REQUEST: [
    /solicitar.*demo.*gps/i, /demo.*plataforma/i, /probar.*plataforma/i,
    /ver.*plataforma/i
  ],
  ALL_FUNCTIONS: [
    /todas.*funciones/i, /qu[eé].*puede.*hacer/i, /funciones.*chatbot/i,
    /alcance/i, /capacidades/i, /todo.*puede/i
  ],
  FUNCTIONS_ATTENTION: [/atenci[oó]n.*cliente/i, /atender.*cliente/i],
  FUNCTIONS_SALES: [/ventas/i, /vender/i],
  FUNCTIONS_QUOTES: [/cotizacion/i, /cotizar/i],
  FUNCTIONS_APPOINTMENTS: [/citas/i, /reservacion/i, /agendar/i, /agenda/i],
  FUNCTIONS_CATALOG: [/cat[aá]logo/i, /productos/i, /inventario/i],
  FUNCTIONS_FOLLOWUP: [/seguimiento/i],
  FUNCTIONS_SUPPORT: [/soporte/i, /ayuda.*t[eé]cnica/i],
  FUNCTIONS_ADMIN: [/administraci[oó]n/i, /panel/i, /estad[ií]stica/i],
  OTHER_BUSINESS: [
    /otros? negocio/i, /ejemplo.*negocio/i, /otros? tipo/i,
    /ejemplo.*cl[ií]nica/i, /ejemplo.*tienda/i, /ejemplo.*restaurante/i,
    /otros? empresa/i
  ],
  BUSINESS_CLINIC: [/cl[ií]nica/i, /consultorio/i, /m[eé]dico/i, /doctor/i, /dental/i, /hospital/i],
  BUSINESS_MEDICAL_EQUIPMENT: [/equipo.*m[eé]dico/i, /ultrasonido/i, /aparato.*m[eé]dico/i],
  BUSINESS_REAL_ESTATE: [/inmobiliaria/i, /bienes.*ra[ií]ces/i, /propiedad/i, /departamento/i, /casa.*venta/i],
  BUSINESS_STORE: [/tienda/i, /comercio/i, /vendo.*producto/i, /ecommerce/i],
  BUSINESS_WORKSHOP: [/taller/i, /mec[aá]nic/i, /automotriz/i, /reparaci[oó]n/i],
  BUSINESS_RESTAURANT: [/restaurante/i, /comida/i, /cocina/i, /cafeter[ií]a/i],
  BUSINESS_SCHOOL: [/escuela/i, /curso/i, /capacitaci[oó]n/i, /academia/i, /universidad/i],
  BUSINESS_SECURITY: [/seguridad/i, /c[aá]mara/i, /alarma/i, /vigilancia/i],
  BUSINESS_PROFESSIONAL: [/servicio.*profesional/i, /consultor/i, /asesor[ií]a/i, /despacho/i, /abogado/i, /contador/i],
  BUSINESS_OTHER: [],
  CREATE_DEMO: [
    /crear.*demo/i, /demo.*mi empresa/i, /demo.*mi negocio/i,
    /demo.*personaliz/i, /ejemplo.*para m[ií]/i, /prueba.*mi negocio/i
  ],
  INTEGRATIONS: [
    /integracion/i, /conectar/i, /integrar/i, /plataformas/i,
    /sistemas/i, /crm/i
  ],
  QUOTE_REQUEST: [
    /cotizaci[oó]n/i, /cotizar/i, /propuesta/i, /presupuesto/i,
    /cu[aá]nto.*cuesta/i, /precio/i, /costo/i, /tarifa/i
  ],
  TALK_ADVISOR: [
    /hablar.*asesor/i, /hablar.*persona/i, /hablar.*humano/i,
    /quiero.*asesor/i, /contactar.*asesor/i, /agente.*humano/i,
    /persona.*real/i, /vendedor/i
  ],
  PRICING: [
    /precio/i, /cu[aá]nto.*cuesta/i, /costo/i, /tarifa/i,
    /cu[aá]nto.*cobran/i, /inversi[oó]n/i
  ],
  SUPPORT: [
    /no puedo.*entrar/i, /no aparece/i, /olvid[eé].*contrase[nñ]a/i,
    /problema.*cuenta/i, /error/i, /no funciona/i, /ayuda.*t[eé]cnica/i
  ],
  WHATSAPP_INFO: [
    /whatsapp/i, /funciona.*whats/i, /trabaja.*whats/i,
    /integra.*whats/i
  ],
  AI_INFO: [
    /inteligencia.*artificial/i, /ia\b/i, /\bai\b/i,
    /machine.*learning/i, /aprende/i
  ],
  LEAD_DATA: [
    /mi nombre es/i, /me llamo/i, /mi empresa es/i, /mi negocio es/i,
    /soy de/i, /mi correo/i, /mi tel[eé]fono/i, /mi n[uú]mero/i
  ],
  PURCHASE_INTENT: [
    /quiero.*contratar/i, /quiero.*comprar/i, /me interesa/i,
    /cu[aá]ndo.*empezar/i, /c[oó]mo.*empiezo/i, /listo.*para/i,
    /vamos.*adelante/i, /cerremos/i
  ],
  PRICE_OBJECTION: [
    /muy.*caro/i, /muy.*costoso/i, /no.*alcanza/i, /descuento/i,
    /m[aá]s.*barato/i, /competencia.*cobra/i
  ],
  COMPARISON: [
    /comparar/i, /diferencia/i, /vs/i, /mejor.*que/i,
    /ventaja.*sobre/i, /competencia/i
  ],
  FAREWELL: [
    /adi[oó]s/i, /hasta.*luego/i, /nos.*vemos/i, /chao/i,
    /bye/i, /gracias.*todo/i, /hasta.*pronto/i
  ],
  FREE_TEXT: [] // Catch-all, no patterns
};

/**
 * Detect intent from a message using keyword matching first, then AI fallback
 */
export async function detectIntent(
  message: string,
  conversationContext: string = ''
): Promise<{ intent: Intent; confidence: number; extractedData: Record<string, any> }> {
  const normalizedMessage = message.trim().toLowerCase();
  
  // First try keyword matching
  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(normalizedMessage)) {
        // Also try to extract data from the message
        const extractedData = extractBasicData(message);
        return {
          intent: intent as Intent,
          confidence: 0.9,
          extractedData
        };
      }
    }
  }

  // Fallback to AI classification for complex messages
  try {
    const result = await classifyIntent(message, conversationContext);
    return {
      intent: (result.intent || 'FREE_TEXT') as Intent,
      confidence: result.confidence || 0.5,
      extractedData: result.extractedData || {}
    };
  } catch (error) {
    console.error('AI intent classification failed:', error);
    return { intent: 'FREE_TEXT', confidence: 0.3, extractedData: {} };
  }
}

/**
 * Extract basic data from user message using simple patterns
 */
function extractBasicData(message: string): Record<string, any> {
  const data: Record<string, any> = {};

  // Extract name
  const nameMatch = message.match(/(?:mi nombre es|me llamo|soy)\s+([A-ZÁÉÍÓÚÑa-záéíóúñ\s]+?)(?:\.|,|$)/i);
  if (nameMatch) data.name = nameMatch[1].trim();

  // Extract company
  const companyMatch = message.match(/(?:mi empresa|mi negocio|la empresa|el negocio)(?:\s+(?:es|se llama))?\s+([A-ZÁÉÍÓÚÑa-záéíóúñ0-9\s]+?)(?:\.|,|$)/i);
  if (companyMatch) data.company = companyMatch[1].trim();

  // Extract email
  const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
  if (emailMatch) data.email = emailMatch[0];

  // Extract vehicle count
  const vehicleMatch = message.match(/(\d+)\s*(?:camion|unidad|veh[ií]culo|carro|coche|auto|moto|camioneta|tr[aá]iler)/i);
  if (vehicleMatch) data.vehicleCount = parseInt(vehicleMatch[1]);

  // Also check reverse pattern: "camiones 30" or "tengo 30"
  const vehicleMatch2 = message.match(/(?:tengo|tenemos|son|somos|monitorear|rastrear|proteger)\s*(\d+)/i);
  if (!data.vehicleCount && vehicleMatch2) data.vehicleCount = parseInt(vehicleMatch2[1]);

  // Extract city
  const cityMatch = message.match(/(?:soy de|estoy en|vivo en|ubicad[oa]? en|ciudad)\s+([A-ZÁÉÍÓÚÑa-záéíóúñ\s]+?)(?:\.|,|$)/i);
  if (cityMatch) data.city = cityMatch[1].trim();

  return data;
}

/**
 * Map button IDs to intents
 */
export function buttonIdToIntent(buttonId: string): Intent {
  const mapping: Record<string, Intent> = {
    'menu_gps_demo': 'GPS_DEMO',
    'menu_what_chatbot': 'WHAT_IS_CHATBOT',
    'menu_functions': 'ALL_FUNCTIONS',
    'menu_other_business': 'OTHER_BUSINESS',
    'menu_create_demo': 'CREATE_DEMO',
    'menu_integrations': 'INTEGRATIONS',
    'menu_quote': 'QUOTE_REQUEST',
    'menu_advisor': 'TALK_ADVISOR',
    // GPS demo submenu
    'gps_quote': 'GPS_QUOTE',
    'gps_protect': 'GPS_PROTECT_VEHICLE',
    'gps_fleet': 'GPS_FLEET',
    'gps_functions': 'GPS_FUNCTIONS',
    'gps_demo_request': 'GPS_DEMO_REQUEST',
    // Functions submenu
    'func_attention': 'FUNCTIONS_ATTENTION',
    'func_sales': 'FUNCTIONS_SALES',
    'func_quotes': 'FUNCTIONS_QUOTES',
    'func_appointments': 'FUNCTIONS_APPOINTMENTS',
    'func_catalog': 'FUNCTIONS_CATALOG',
    'func_followup': 'FUNCTIONS_FOLLOWUP',
    'func_support': 'FUNCTIONS_SUPPORT',
    'func_admin': 'FUNCTIONS_ADMIN',
    'func_integrations': 'INTEGRATIONS',
    // Business types
    'biz_clinic': 'BUSINESS_CLINIC',
    'biz_medical': 'BUSINESS_MEDICAL_EQUIPMENT',
    'biz_real_estate': 'BUSINESS_REAL_ESTATE',
    'biz_store': 'BUSINESS_STORE',
    'biz_workshop': 'BUSINESS_WORKSHOP',
    'biz_restaurant': 'BUSINESS_RESTAURANT',
    'biz_school': 'BUSINESS_SCHOOL',
    'biz_security': 'BUSINESS_SECURITY',
    'biz_professional': 'BUSINESS_PROFESSIONAL',
    'biz_other': 'BUSINESS_OTHER',
    // Close options
    'close_quote': 'QUOTE_REQUEST',
    'close_demo': 'GPS_DEMO_REQUEST',
    'close_advisor': 'TALK_ADVISOR',
    'close_whatsapp': 'TALK_ADVISOR',
    // General
    'btn_yes': 'PURCHASE_INTENT',
    'btn_no': 'FAREWELL',
    'btn_more_info': 'ALL_FUNCTIONS',
    'btn_back_menu': 'GREETING'
  };

  return mapping[buttonId] || 'FREE_TEXT';
}
