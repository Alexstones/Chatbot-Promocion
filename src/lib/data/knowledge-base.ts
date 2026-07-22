// =============================================================================
// KNOWLEDGE BASE - Base de conocimiento del chatbot
// Toda la información organizada por tema para el chatbot de promoción
// =============================================================================

// -----------------------------------------------------------------------------
// 1. MENSAJE DE BIENVENIDA
// -----------------------------------------------------------------------------

export const WELCOME_MESSAGE = `🤖 Hola, soy un asesor inteligente especializado en automatización y chatbots para empresas.

Puedo mostrarte cómo un chatbot puede atender clientes, responder preguntas, generar cotizaciones, recomendar servicios y ayudar a vender por WhatsApp automáticamente.

Para que veas cómo funciona, tenemos una demostración basada en una empresa de GPS, rastreo satelital y control de flotillas.

¿Qué te gustaría conocer?`;

// -----------------------------------------------------------------------------
// 2. ¿QUÉ ES UN CHATBOT?
// -----------------------------------------------------------------------------

export const WHAT_IS_CHATBOT = `🤖 *¿Qué es un chatbot con inteligencia artificial?*

Un chatbot es un asistente virtual que atiende a tus clientes de forma automática a través de WhatsApp, tu página web u otras plataformas de mensajería. Funciona las 24 horas del día, los 7 días de la semana, sin descansos ni días festivos.

A diferencia de un chatbot tradicional basado en menús rígidos, un chatbot con inteligencia artificial entiende lo que el cliente escribe en lenguaje natural, detecta su intención, extrae datos importantes y responde de forma personalizada, como si fuera un asesor humano.

📌 *Un chatbot puede desempeñar estos roles en tu empresa:*

1️⃣ *Asesor de ventas* — Detecta interés de compra, recomienda productos o servicios y guía al cliente hasta la cotización o cierre.

2️⃣ *Asistente de atención al cliente* — Responde preguntas frecuentes, explica servicios, horarios, ubicaciones y requisitos de forma inmediata.

3️⃣ *Generador de prospectos* — Recopila nombre, teléfono, correo y datos de interés del cliente para que tu equipo de ventas los contacte.

4️⃣ *Cotizador automático* — Pregunta cantidades, especificaciones y datos necesarios, luego genera o solicita una cotización personalizada.

5️⃣ *Asistente de soporte técnico* — Responde preguntas técnicas básicas, recopila datos del problema y transfiere a soporte humano cuando es necesario.

6️⃣ *Agendador de citas* — Consulta disponibilidad, programa citas, envía recordatorios y permite reprogramar o cancelar.

7️⃣ *Promotor de productos y servicios* — Muestra catálogos, promociones vigentes, novedades y ofertas especiales.

8️⃣ *Filtro de clientes* — Clasifica a los contactos según su perfil, necesidad y nivel de interés para que el equipo de ventas priorice.

9️⃣ *Asistente para vendedores* — Proporciona fichas de clientes, resúmenes de conversaciones y datos organizados para que el vendedor cierre más rápido.

🔟 *Operador de seguimiento* — Contacta prospectos que no respondieron, envía recordatorios de cotizaciones y reactiva conversaciones inactivas.

1️⃣1️⃣ *Recepcionista virtual* — Recibe a cada contacto, lo saluda, identifica qué necesita y lo dirige al área o persona correspondiente.

💡 Un chatbot no reemplaza a tu equipo, lo complementa. Se encarga de las tareas repetitivas para que tu personal se concentre en cerrar ventas y atender casos especiales.`;

// -----------------------------------------------------------------------------
// 3. FUNCIONES DEL CHATBOT POR CATEGORÍA
// -----------------------------------------------------------------------------

export interface FunctionCategory {
  name: string;
  emoji: string;
  description: string;
  capabilities: string[];
}

export const CHATBOT_FUNCTIONS: Record<string, FunctionCategory> = {
  attention: {
    name: 'Atención al cliente',
    emoji: '💬',
    description: 'Responde automáticamente a las preguntas más comunes de tus clientes, sin tiempos de espera.',
    capabilities: [
      'Responder preguntas frecuentes de forma inmediata',
      'Explicar servicios, productos y planes disponibles',
      'Consultar y mostrar horarios de atención',
      'Mostrar ubicaciones y direcciones con enlaces a mapas',
      'Informar requisitos, documentación y procesos',
      'Resolver dudas iniciales sin intervención humana',
      'Transferir la conversación a un agente humano cuando sea necesario',
    ],
  },
  sales: {
    name: 'Ventas',
    emoji: '💰',
    description: 'Guía al cliente desde el primer contacto hasta la solicitud de cotización o compra.',
    capabilities: [
      'Detectar intención de compra en la conversación',
      'Recomendar productos o servicios según las necesidades del cliente',
      'Comparar paquetes, planes y opciones disponibles',
      'Mostrar promociones y ofertas vigentes',
      'Identificar necesidades específicas del cliente',
      'Recopilar datos de contacto del prospecto',
      'Generar fichas de prospectos con información organizada',
      'Preparar solicitudes de cotización con datos completos',
      'Enviar al cliente con un vendedor humano cuando esté listo para cerrar',
    ],
  },
  quotes: {
    name: 'Cotizaciones',
    emoji: '📋',
    description: 'Recopila la información necesaria para generar cotizaciones personalizadas de forma automática.',
    capabilities: [
      'Preguntar cantidades, unidades o volúmenes requeridos',
      'Solicitar medidas, dimensiones o especificaciones técnicas',
      'Recopilar especificaciones del proyecto o necesidad',
      'Calcular precios estimados según tablas configuradas',
      'Generar solicitudes de cotización formales',
      'Enviar la solicitud al área de ventas para revisión',
      'Guardar historial de cotizaciones anteriores del cliente',
    ],
  },
  appointments: {
    name: 'Citas y reservaciones',
    emoji: '📅',
    description: 'Gestiona la agenda de tu negocio de forma automática, sin necesidad de llamar por teléfono.',
    capabilities: [
      'Consultar horarios disponibles en tiempo real',
      'Solicitar y agendar citas con datos del cliente',
      'Reprogramar citas existentes según disponibilidad',
      'Cancelar citas y liberar horarios automáticamente',
      'Enviar recordatorios de citas próximas',
      'Confirmar asistencia del cliente antes de la cita',
    ],
  },
  catalog: {
    name: 'Catálogos de productos y servicios',
    emoji: '📦',
    description: 'Muestra tu catálogo completo de forma interactiva, como tener una tienda dentro de WhatsApp.',
    capabilities: [
      'Mostrar productos o servicios organizados por categoría',
      'Consultar características, fichas técnicas y descripciones',
      'Filtrar productos por tipo, precio, categoría o disponibilidad',
      'Comparar dos o más productos lado a lado',
      'Mostrar imágenes y multimedia de los productos',
      'Informar disponibilidad y tiempos de entrega',
      'Consultar precios y formas de pago',
      'Recomendar productos según el presupuesto del cliente',
    ],
  },
  followup: {
    name: 'Seguimiento',
    emoji: '🔄',
    description: 'Mantiene el contacto con prospectos y clientes que aún no han cerrado, recuperando oportunidades de venta.',
    capabilities: [
      'Recordar cotizaciones pendientes y dar seguimiento',
      'Contactar prospectos que no respondieron en un período definido',
      'Preguntar al cliente si requiere ayuda adicional',
      'Enviar recordatorios de ofertas, promociones o vencimientos',
      'Reactivar conversaciones inactivas de forma natural',
      'Notificar a vendedores sobre prospectos que requieren atención',
      'Detectar clientes que dejaron de responder y programar recontacto',
    ],
  },
  support: {
    name: 'Soporte técnico básico',
    emoji: '🔧',
    description: 'Atiende consultas técnicas iniciales y escala los casos que requieren intervención especializada.',
    capabilities: [
      'Responder preguntas técnicas básicas y frecuentes',
      'Recopilar datos del problema reportado (equipo, modelo, síntomas)',
      'Clasificar el tipo y urgencia del problema',
      'Transferir a soporte humano con un resumen del caso',
    ],
  },
  admin: {
    name: 'Administración y reportes',
    emoji: '📊',
    description: 'Organiza la información de clientes y genera reportes útiles para la toma de decisiones.',
    capabilities: [
      'Guardar el historial completo de cada conversación',
      'Crear fichas de cliente con datos organizados',
      'Clasificar clientes por tipo, interés y nivel de prioridad',
      'Asignar vendedores o agentes según el tipo de consulta',
      'Generar resúmenes automáticos de cada conversación',
      'Mostrar estadísticas de atención, respuestas y conversiones',
      'Identificar preguntas frecuentes para mejorar la base de conocimiento',
      'Medir tasas de conversión y efectividad del chatbot',
    ],
  },
};

// -----------------------------------------------------------------------------
// 4. INTEGRACIONES
// -----------------------------------------------------------------------------

export interface Integration {
  name: string;
  emoji: string;
  description: string;
}

export const INTEGRATIONS_INFO: Integration[] = [
  {
    name: 'Página web',
    emoji: '🌐',
    description: 'Widget de chat integrado en tu sitio web para atender visitantes en tiempo real.',
  },
  {
    name: 'WhatsApp',
    emoji: '📱',
    description: 'Conexión directa con WhatsApp Business API para atender clientes en la plataforma más usada.',
  },
  {
    name: 'Facebook Messenger',
    emoji: '💬',
    description: 'Atención automática a través de tu página de Facebook.',
  },
  {
    name: 'Instagram',
    emoji: '📸',
    description: 'Respuestas automáticas a mensajes directos y comentarios en Instagram.',
  },
  {
    name: 'Formularios',
    emoji: '📝',
    description: 'Integración con formularios web para capturar datos de prospectos automáticamente.',
  },
  {
    name: 'Correo electrónico',
    emoji: '📧',
    description: 'Envío automático de cotizaciones, confirmaciones y seguimientos por email.',
  },
  {
    name: 'CRM',
    emoji: '🗂️',
    description: 'Conexión con tu sistema CRM para sincronizar contactos, prospectos y oportunidades.',
  },
  {
    name: 'Catálogos',
    emoji: '📦',
    description: 'Integración con tu catálogo de productos o servicios para mostrar información actualizada.',
  },
  {
    name: 'Bases de datos',
    emoji: '🗄️',
    description: 'Conexión directa con bases de datos para consultar y guardar información en tiempo real.',
  },
  {
    name: 'Calendarios',
    emoji: '📅',
    description: 'Sincronización con Google Calendar, Outlook u otros calendarios para gestionar citas.',
  },
  {
    name: 'Sistemas de citas',
    emoji: '🕐',
    description: 'Integración con plataformas de agendamiento como Calendly, SimplyBook u otros.',
  },
  {
    name: 'Sistemas de inventario',
    emoji: '📊',
    description: 'Consulta de disponibilidad y existencias en tiempo real desde tu sistema de inventario.',
  },
  {
    name: 'Plataformas de pago',
    emoji: '💳',
    description: 'Generación de enlaces de pago con Stripe, PayPal, MercadoPago u otras plataformas.',
  },
  {
    name: 'Paneles administrativos',
    emoji: '🖥️',
    description: 'Dashboard personalizado para visualizar métricas, conversaciones y rendimiento del chatbot.',
  },
  {
    name: 'Sistemas de seguimiento',
    emoji: '🔄',
    description: 'Automatización de seguimientos programados con prospectos y clientes.',
  },
  {
    name: 'API de terceros',
    emoji: '🔗',
    description: 'Conexión con cualquier sistema externo que tenga una API disponible.',
  },
];

// -----------------------------------------------------------------------------
// 5. INFORMACIÓN SOBRE INTELIGENCIA ARTIFICIAL
// -----------------------------------------------------------------------------

export const AI_INFO = `🧠 *¿Cómo funciona la inteligencia artificial en el chatbot?*

La inteligencia artificial es el cerebro del chatbot. Es lo que permite que entienda a tus clientes como lo haría un humano, pero de forma automática y sin errores por cansancio.

📌 *Esto es lo que hace la IA en cada conversación:*

🔍 *Detecta la intención del cliente*
No importa cómo lo escriba, la IA identifica qué quiere el cliente. Por ejemplo, todas estas frases significan lo mismo:
• "¿Cuánto cuesta?"
• "Quiero saber el precio"
• "¿Qué precio tienen?"
• "Me interesa, ¿cuánto sale?"
• "Precio porfa"
• "cuanto m sale"
La IA entiende que en todos los casos el cliente pregunta por el costo.

📋 *Extrae datos importantes*
Cuando el cliente escribe "Tengo 5 camionetas Ford en Monterrey", la IA extrae automáticamente:
• Cantidad: 5
• Tipo de vehículo: camionetas
• Marca: Ford
• Ciudad: Monterrey

🔤 *Entiende errores de escritura*
Si alguien escribe "kiero bver los presius del rastre", la IA interpreta correctamente: "Quiero ver los precios del rastreo".

📝 *Resume conversaciones*
Al final de cada conversación, genera un resumen con los datos recopilados, las preguntas realizadas y el resultado, listo para enviarse al vendedor.

🎯 *Adapta el tono*
Si el cliente es formal, responde formalmente. Si es casual, responde de forma más relajada. Se adapta al estilo de comunicación de cada persona.

💡 *Crea respuestas personalizadas*
No usa respuestas genéricas. Cada respuesta se construye en tiempo real basándose en la información del cliente y el contexto de la conversación.

🛒 *Identifica oportunidades de venta*
Detecta señales de compra como "me interesa", "quiero contratar", "necesito información para decidir" y adapta su respuesta para avanzar hacia el cierre.

🔀 *Decide cuándo transferir*
Sabe cuándo puede resolver por sí mismo y cuándo es mejor pasar la conversación a un humano: cotizaciones complejas, quejas, negociaciones o solicitudes fuera de su alcance.

💡 La IA aprende de cada conversación para mejorar continuamente sus respuestas y recomendaciones.`;

// -----------------------------------------------------------------------------
// 6. INFORMACIÓN SOBRE WHATSAPP
// -----------------------------------------------------------------------------

export const WHATSAPP_INFO = `📱 *Integración con WhatsApp Business API*

El chatbot se conecta directamente a la API oficial de WhatsApp Business, lo que garantiza:

✅ *Conexión oficial y segura*
No usamos aplicaciones no autorizadas ni extensiones de terceros. La conexión es directa con Meta (Facebook), cumpliendo todas sus políticas.

✅ *Número verificado con palomita verde*
Tu empresa puede obtener la verificación oficial de WhatsApp, generando mayor confianza en tus clientes.

✅ *Mensajes ilimitados*
Sin restricciones en la cantidad de conversaciones simultáneas ni mensajes enviados.

✅ *Multimedia completa*
Envío y recepción de imágenes, documentos PDF, ubicaciones, contactos, audios y videos.

✅ *Botones interactivos*
Menús con botones de respuesta rápida, listas de opciones y llamados a la acción que facilitan la navegación.

✅ *Mensajes de plantilla*
Envío de mensajes proactivos aprobados por Meta para confirmaciones, recordatorios, notificaciones y seguimientos.

✅ *Múltiples agentes*
Varios miembros de tu equipo pueden ver y responder conversaciones cuando el chatbot transfiere.

✅ *Disponibilidad 24/7*
El chatbot responde al instante a cualquier hora del día, cualquier día del año.

📌 *¿Qué se necesita para activarlo?*
• Una cuenta de Facebook Business verificada
• Un número de teléfono dedicado para WhatsApp
• Acceso a la API de WhatsApp Business (nosotros lo configuramos)
• Definir los flujos de conversación y la información del negocio

⏱️ El proceso de configuración toma entre 3 y 7 días hábiles, dependiendo de la complejidad del negocio.`;

// -----------------------------------------------------------------------------
// 7. CIERRE COMERCIAL
// -----------------------------------------------------------------------------

export const CLOSING_COMMERCIAL = `🚀 *¡Lleva tu negocio al siguiente nivel con un chatbot inteligente!*

Si te interesa implementar un chatbot como este para tu empresa, necesitamos algunos datos para prepararte una propuesta personalizada:

📌 *Por favor compártenos:*

1️⃣ *Tu nombre completo*
2️⃣ *Nombre de tu empresa o negocio*
3️⃣ *Giro o industria* (¿a qué se dedica tu empresa?)
4️⃣ *¿Qué funciones te interesan más?* (ventas, atención, citas, cotizaciones, etc.)
5️⃣ *¿Ya tienes WhatsApp Business?*
6️⃣ *¿Cuántos mensajes recibes al día aproximadamente?*
7️⃣ *Tu correo electrónico de contacto*
8️⃣ *Tu número de WhatsApp para contactarte*

📞 También puedes agendar una llamada o videollamada de demostración con uno de nuestros asesores.

💬 Escríbenos y te preparamos una propuesta sin compromiso.`;

// -----------------------------------------------------------------------------
// 8. RESPUESTAS A PREGUNTAS FRECUENTES (FAQ)
// -----------------------------------------------------------------------------

export const FAQ_RESPONSES: Record<string, string> = {
  // Pregunta 1
  '¿Qué es un chatbot?':
    '🤖 Un chatbot es un programa que responde automáticamente los mensajes de tus clientes. Funciona como un asistente virtual disponible las 24 horas que puede atender preguntas, recomendar productos, generar cotizaciones y capturar datos de prospectos, todo sin intervención humana.',

  // Pregunta 2
  '¿Cómo funciona un chatbot con inteligencia artificial?':
    '🧠 Un chatbot con IA utiliza modelos de lenguaje avanzados para entender lo que escribe el cliente, detectar su intención, extraer datos relevantes y generar respuestas naturales y personalizadas. No se limita a menús fijos; puede mantener una conversación fluida y adaptarse al contexto.',

  // Pregunta 3
  '¿En qué plataformas se puede usar?':
    '📱 El chatbot se puede integrar en WhatsApp, Facebook Messenger, Instagram, tu página web, correo electrónico y prácticamente cualquier plataforma de mensajería. La más popular y efectiva para negocios en México y Latinoamérica es WhatsApp.',

  // Pregunta 4
  '¿Cuánto cuesta un chatbot?':
    '💰 El costo varía según la complejidad, las funciones requeridas, las integraciones y el volumen de conversaciones. Podemos prepararte una cotización personalizada según las necesidades de tu negocio. ¿Te gustaría que te preparemos una propuesta?',

  // Pregunta 5
  '¿Cuánto tiempo tarda la implementación?':
    '⏱️ Un chatbot básico puede estar funcionando en 1 a 2 semanas. Proyectos más complejos con integraciones a CRM, bases de datos o sistemas de inventario pueden tomar de 3 a 6 semanas. Todo depende del alcance del proyecto.',

  // Pregunta 6
  '¿El chatbot reemplaza a mis empleados?':
    '👥 No, el chatbot complementa a tu equipo. Se encarga de las tareas repetitivas como responder preguntas frecuentes, capturar datos y dar información básica. Cuando el cliente necesita atención personalizada, el chatbot transfiere la conversación a un humano con todo el contexto.',

  // Pregunta 7
  '¿Qué pasa si el chatbot no sabe responder?':
    '🔀 Cuando el chatbot detecta una pregunta que no puede resolver, transfiere automáticamente la conversación a un agente humano. El agente recibe un resumen completo de la conversación para no hacer que el cliente repita información.',

  // Pregunta 8
  '¿Se puede personalizar para mi negocio?':
    '🎨 Totalmente. Cada chatbot se diseña específicamente para tu negocio: con tu tono de comunicación, tus productos y servicios, tus precios, tus horarios y tus flujos de atención. No es una solución genérica, es un asistente hecho a la medida.',

  // Pregunta 9
  '¿Funciona las 24 horas?':
    '🕐 Sí, el chatbot funciona las 24 horas del día, los 7 días de la semana, los 365 días del año. No tiene horarios, no se enferma, no toma vacaciones y responde al instante sin importar la hora.',

  // Pregunta 10
  '¿Puede enviar imágenes y documentos?':
    '📎 Sí, el chatbot puede enviar y recibir imágenes, documentos PDF, ubicaciones, contactos, audios y videos a través de WhatsApp. Puede mostrar fotos de productos, enviar catálogos en PDF o compartir la ubicación de tu negocio.',

  // Pregunta 11
  '¿Qué información puede recopilar?':
    '📋 El chatbot puede recopilar cualquier dato que necesites: nombre, teléfono, correo, empresa, giro, ciudad, cantidad de productos, especificaciones técnicas, presupuesto, fechas preferidas, y cualquier otro dato relevante para tu negocio.',

  // Pregunta 12
  '¿Cómo se ve la conversación para el cliente?':
    '💬 Para el cliente es una conversación normal de WhatsApp. Escribe sus preguntas con sus propias palabras y recibe respuestas claras, bien formateadas y con emojis. Muchos clientes no notan que están hablando con un chatbot porque las respuestas son muy naturales.',

  // Pregunta 13
  '¿Necesito conocimientos técnicos?':
    '🔧 No, nosotros nos encargamos de toda la configuración técnica. Tú solo necesitas proporcionarnos la información de tu negocio: servicios, precios, horarios, preguntas frecuentes, etc. Nosotros hacemos el resto.',

  // Pregunta 14
  '¿Puedo ver las conversaciones?':
    '📊 Sí, tienes acceso a un panel donde puedes ver todas las conversaciones, los datos recopilados, las estadísticas de atención y los reportes de rendimiento. También puedes recibir notificaciones cuando un prospecto solicita atención humana.',

  // Pregunta 15
  '¿Se integra con mi sistema actual?':
    '🔗 Sí, el chatbot se puede integrar con CRM, sistemas de inventario, calendarios, bases de datos, plataformas de pago y cualquier sistema que tenga una API disponible. Analizamos tu infraestructura actual para hacer la integración más conveniente.',

  // Pregunta 16
  '¿Qué tipo de negocios pueden usarlo?':
    '🏢 Cualquier negocio que atienda clientes puede beneficiarse: clínicas, inmobiliarias, restaurantes, talleres, tiendas, escuelas, empresas de seguridad, despachos profesionales, empresas de servicios, comercios electrónicos y muchos más.',

  // Pregunta 17
  '¿Pueden hacer una demostración?':
    '🎯 ¡Claro! De hecho, esta conversación es una demostración. Estás interactuando con un chatbot que muestra las capacidades que podría tener el tuyo. Si quieres ver cómo funcionaría para tu negocio específico, podemos agendar una sesión personalizada.',

  // Pregunta 18
  '¿Cómo empiezo?':
    '🚀 Es muy sencillo: 1) Nos compartes información sobre tu negocio, 2) Diseñamos los flujos de conversación, 3) Configuramos la IA con tu información, 4) Conectamos a WhatsApp, 5) Hacemos pruebas y ajustes, 6) ¡Listo para atender clientes! ¿Quieres que empecemos?',
};

// -----------------------------------------------------------------------------
// 9. SYSTEM PROMPT PARA DEEPSEEK
// -----------------------------------------------------------------------------

export const SYSTEM_PROMPT = `Eres un asesor inteligente especializado en chatbots con inteligencia artificial para empresas. Tu objetivo es mostrar las capacidades de un chatbot y convencer al usuario de que esta tecnología puede beneficiar a su negocio.

=== IDENTIDAD ===
- Nombre: Asesor de Chatbots IA
- Rol: Demostrar las capacidades de un chatbot inteligente y generar interés comercial
- Idioma: Siempre responde en español
- Tono: Profesional pero amigable, claro y directo
- Formato: Usa emojis con moderación, negritas con *asteriscos* para énfasis, y listas cuando sea apropiado

=== CONTEXTO ===
Estás en una conversación de WhatsApp con un potencial cliente que quiere conocer los beneficios de implementar un chatbot en su empresa. Tienes una demostración basada en una empresa de GPS y rastreo satelital para mostrar cómo funciona un chatbot en acción.

=== REGLAS DE CONVERSACIÓN ===

1. SIEMPRE responde en español.
2. Mantén las respuestas concisas y bien formateadas para WhatsApp (máximo 2-3 párrafos por respuesta, a menos que el usuario pida información detallada).
3. Usa emojis al inicio de puntos importantes pero no abuses de ellos.
4. Cuando el usuario haga preguntas sobre el chatbot, responde con información específica y ejemplos.
5. Cuando el usuario muestre interés comercial, guíalo hacia el cierre (solicitar datos de contacto).
6. Si el usuario pregunta algo fuera de tema, responde de manera extremadamente cortés pero firme: "Disculpa, como asistente especializado en automatización y chatbots empresariales, solo puedo responder preguntas y conversar sobre automatización de chats, funciones de bots, integraciones de mensajería y demostraciones comerciales. ¿Te gustaría conocer cómo automatizar la atención en tu negocio?". NUNCA respondas preguntas de cultura general, matemáticas, otros productos, o cualquier asunto ajeno a chatbots y automatización./n  Si el cliente persiste con temas fuera de lugar, reitera esta limitación de forma atenta.
7. NUNCA inventes información que no tengas. Si no sabes algo, dilo honestamente.
8. NUNCA digas que eres una IA o un chatbot a menos que te lo pregunten directamente.
9. Trata cada mensaje como parte de una conversación continua, recuerda el contexto anterior.
10. Si el usuario muestra frustración o confusión, simplifica tu respuesta y ofrece ayuda directa.

=== INTENCIONES A DETECTAR ===

Debes detectar la intención del usuario en cada mensaje y clasificarla en una de estas categorías:

- GREETING: Saludo inicial (hola, buenos días, qué tal, hey)
- WHAT_IS_CHATBOT: Pregunta qué es un chatbot o cómo funciona
- CHATBOT_FUNCTIONS: Pregunta por funciones o capacidades específicas
- GPS_DEMO: Quiere ver la demostración de GPS
- BUSINESS_TYPES: Pregunta por tipos de negocio o ejemplos específicos
- INTEGRATIONS: Pregunta sobre integraciones con otros sistemas
- AI_INFO: Pregunta sobre la inteligencia artificial
- WHATSAPP_INFO: Pregunta sobre integración con WhatsApp
- PRICING: Pregunta por precios o costos
- TIMELINE: Pregunta por tiempos de implementación
- FAQ: Pregunta frecuente genérica
- INTEREST: Muestra interés comercial, quiere cotización o demo personalizada
- LEAD_DATA: Proporciona datos personales o de contacto
- OBJECTION: Expresa una objeción o duda sobre el servicio
- SUPPORT: Necesita soporte o tiene un problema técnico
- OFF_TOPIC: Tema no relacionado con chatbots
- MENU_REQUEST: Pide ver el menú o las opciones disponibles
- GOODBYE: Se despide o indica que terminó

=== DATOS A DETECTAR Y EXTRAER ===

Cuando el usuario proporcione información, extrae y guarda estos datos:

- nombre: Nombre de la persona
- empresa: Nombre de la empresa o negocio
- giro: Industria o giro del negocio
- ciudad: Ciudad o ubicación
- telefono: Número de teléfono
- email: Correo electrónico
- num_empleados: Número de empleados
- volumen_mensajes: Cantidad de mensajes que reciben al día
- tiene_whatsapp_business: Si ya tiene WhatsApp Business
- funciones_interes: Funciones que le interesan (ventas, atención, citas, etc.)
- presupuesto: Presupuesto estimado
- urgencia: Nivel de urgencia (inmediata, corto plazo, explorando)
- competidores: Si mencionan que usan otro sistema o competidor

=== FORMATO DE RESPUESTA ===

Tu respuesta debe ser SOLO el texto del mensaje para WhatsApp. No incluyas metadatos, JSON, ni marcadores de intención. Solo el texto natural de la respuesta.

Reglas de formato para WhatsApp:
- Usa *asteriscos* para negritas
- Usa _guiones bajos_ para cursiva
- Usa ~tildes~ para tachado
- Usa \`backticks\` para monoespaciado
- Los emojis funcionan directamente
- Las listas numeradas usan 1️⃣ 2️⃣ 3️⃣ o • para viñetas
- Separa secciones con líneas en blanco
- No uses markdown de encabezados (# ## ###), no funcionan en WhatsApp

=== FLUJO DE CONVERSACIÓN IDEAL ===

1. El usuario llega y recibe el mensaje de bienvenida con el menú principal.
2. Explora las opciones: qué es un chatbot, funciones, demo GPS, tipos de negocio, etc.
3. Muestra interés en una o más funciones.
4. Quiere ver cómo se aplicaría a su negocio específico.
5. Solicita cotización o demostración personalizada.
6. Proporciona datos de contacto → se convierte en prospecto.

Tu trabajo es guiar naturalmente al usuario a través de este flujo sin ser agresivo ni insistente.

=== MANEJO DE OBJECIONES ===

Si el usuario dice:
- "Es muy caro" → Explica el ROI: un chatbot atiende miles de conversaciones sin contratar más personal.
- "Ya tengo personal que atiende" → El chatbot complementa, no reemplaza. Libera a tu equipo de tareas repetitivas.
- "No creo que funcione para mi negocio" → Pregunta su giro y muestra un ejemplo específico.
- "Lo voy a pensar" → Respeta su tiempo, ofrece enviar información por correo y agenda un seguimiento.
- "No entiendo cómo funciona" → Simplifica la explicación y ofrece una demostración en vivo.

=== DETECCIÓN DE OPORTUNIDAD DE CIERRE ===

Cuando detectes cualquiera de estas señales, ofrece el cierre comercial:
- El usuario dice "me interesa", "quiero implementarlo", "¿cómo lo contrato?"
- Pregunta por precios de forma seria (no solo curiosidad)
- Menciona su empresa y su necesidad específica
- Pide una cotización o demostración personalizada
- Ha explorado varias secciones y muestra entusiasmo

=== INFORMACIÓN ADICIONAL ===

Si el usuario pregunta algo que no está en tu base de conocimiento, responde:
"Esa es una excelente pregunta. Para darte información precisa sobre ese tema, te conectaré con uno de nuestros asesores especializados. ¿Me puedes compartir tu nombre y un número de WhatsApp donde te podamos contactar?"

Esto permite capturar el prospecto incluso cuando no tienes la respuesta.`;
