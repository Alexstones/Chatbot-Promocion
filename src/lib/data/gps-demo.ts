// =============================================================================
// GPS DEMO - Datos de la demostración de empresa de GPS y rastreo satelital
// =============================================================================

// -----------------------------------------------------------------------------
// 1. INTRODUCCIÓN A LA DEMO GPS
// -----------------------------------------------------------------------------

export const GPS_INTRO = `📡 *Demostración: Chatbot para empresa de GPS y rastreo satelital*

Imagina que eres un cliente que necesita rastrear sus vehículos. Estás contactando por WhatsApp a una empresa de GPS y rastreo satelital.

El chatbot te va a atender como si fueras un cliente real:

🔹 Te explicará los servicios disponibles
🔹 Te recomendará el plan ideal según tus necesidades
🔹 Te mostrará las funciones de la plataforma
🔹 Te hará preguntas para preparar una cotización
🔹 Capturará tus datos como prospecto

💡 *Prueba escribirle como lo haría un cliente real.* Por ejemplo:
• "Hola, quiero poner GPS a mi carro"
• "¿Cuánto cuesta el rastreo satelital?"
• "Necesito monitorear 10 camiones"
• "¿Tienen apagado remoto?"

¡Adelante, prueba la conversación! 👇`;

// -----------------------------------------------------------------------------
// 2. SERVICIOS DE GPS
// -----------------------------------------------------------------------------

export interface GPSService {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export const GPS_SERVICES: GPSService[] = [
  {
    id: 'rastreo_satelital',
    name: 'Rastreo satelital',
    emoji: '📡',
    description:
      'Localiza tu vehículo en tiempo real desde tu celular o computadora. Consulta su ubicación exacta en cualquier momento del día.',
  },
  {
    id: 'monitoreo_vehicular',
    name: 'Monitoreo vehicular',
    emoji: '🚗',
    description:
      'Supervisión continua del estado y comportamiento de tu vehículo: velocidad, recorridos, paradas y tiempo de uso.',
  },
  {
    id: 'seguridad',
    name: 'Seguridad vehicular',
    emoji: '🔒',
    description:
      'Protege tu vehículo contra robo con alertas de movimiento, geocercas y notificaciones de encendido no autorizado.',
  },
  {
    id: 'control_flotillas',
    name: 'Control de flotillas',
    emoji: '🚛',
    description:
      'Administra todos tus vehículos desde una sola plataforma. Ideal para empresas de transporte, logística y reparto.',
  },
  {
    id: 'ubicacion_tiempo_real',
    name: 'Ubicación en tiempo real',
    emoji: '📍',
    description:
      'Consulta la posición exacta de cualquier vehículo al instante, con actualizaciones cada 10 segundos.',
  },
  {
    id: 'apagado_remoto',
    name: 'Apagado remoto del motor',
    emoji: '🔴',
    description:
      'Apaga el motor de tu vehículo a distancia en caso de robo o uso no autorizado. Función disponible con instalación especial.',
  },
  {
    id: 'geocercas',
    name: 'Geocercas',
    emoji: '🗺️',
    description:
      'Define zonas permitidas y prohibidas en el mapa. Recibe alertas cuando el vehículo entre o salga de estas áreas.',
  },
  {
    id: 'reportes',
    name: 'Reportes de recorridos',
    emoji: '📊',
    description:
      'Reportes detallados de recorridos, kilometraje, paradas, velocidad promedio y tiempo de uso. Descargables en PDF y Excel.',
  },
  {
    id: 'alertas_velocidad',
    name: 'Alertas de velocidad',
    emoji: '⚡',
    description:
      'Configura límites de velocidad y recibe notificaciones cuando un vehículo los exceda. Ideal para control de conductores.',
  },
  {
    id: 'boton_panico',
    name: 'Botón de pánico',
    emoji: '🆘',
    description:
      'Botón de emergencia que envía una alerta inmediata con la ubicación exacta del vehículo al centro de monitoreo.',
  },
  {
    id: 'cuentas_espejo',
    name: 'Cuentas espejo',
    emoji: '👥',
    description:
      'Comparte el acceso a la plataforma con otras personas (socio, familiar, gerente) sin compartir tu contraseña principal.',
  },
  {
    id: 'app_movil',
    name: 'App móvil',
    emoji: '📲',
    description:
      'Aplicación para iOS y Android que te permite monitorear tus vehículos, recibir alertas y ver reportes desde tu celular.',
  },
  {
    id: 'monitoreo_24h',
    name: 'Monitoreo 24 horas',
    emoji: '🕐',
    description:
      'Centro de monitoreo operando las 24 horas del día, los 365 días del año, con operadores capacitados para atender emergencias.',
  },
];

// -----------------------------------------------------------------------------
// 3. PREGUNTAS COMUNES SOBRE GPS
// -----------------------------------------------------------------------------

export interface GPSQuestion {
  question: string;
  answer: string;
}

export const GPS_QUESTIONS: GPSQuestion[] = [
  {
    question: '¿Cuánto cuesta instalar un GPS?',
    answer:
      '📡 El costo de instalación varía según el tipo de dispositivo y el vehículo. Contamos con planes desde $199 mensuales que incluyen el equipo en comodato y la instalación. Para darte un precio exacto, necesito saber: ¿es para un vehículo particular o para flotilla? ¿Cuántas unidades necesitas?',
  },
  {
    question: '¿Manejan mensualidades?',
    answer:
      '💰 Sí, todos nuestros planes son con mensualidad fija. El pago incluye el servicio de rastreo, acceso a la plataforma, app móvil y soporte técnico. No hay cobros sorpresa ni cargos adicionales por consultas.',
  },
  {
    question: '¿El GPS funciona en todo el país?',
    answer:
      '🇲🇽 Sí, nuestro servicio de rastreo satelital funciona en toda la República Mexicana. Utilizamos tecnología GPS + red celular con cobertura nacional. En zonas con señal celular limitada, el dispositivo almacena los datos y los envía cuando recupera la señal.',
  },
  {
    question: '¿Puedo ver mi vehículo desde el celular?',
    answer:
      '📲 ¡Claro! Tenemos una app disponible para iOS y Android. Desde tu celular puedes ver la ubicación en tiempo real, recibir alertas, consultar recorridos y hasta apagar el motor de forma remota (si cuentas con esta función).',
  },
  {
    question: '¿Qué pasa si me roban el carro?',
    answer:
      '🔒 En caso de robo, puedes: 1) Ver la ubicación en tiempo real desde la app, 2) Apagar el motor de forma remota (si tienes esta función), 3) Contactar a nuestro centro de monitoreo 24h para coordinar con las autoridades. El GPS sigue transmitiendo la ubicación incluso si el vehículo está en movimiento.',
  },
  {
    question: '¿Se puede apagar el motor a distancia?',
    answer:
      '🔴 Sí, contamos con la función de apagado remoto del motor. Requiere una instalación especial adicional al GPS básico. Puedes activarlo desde la app o llamando a nuestro centro de monitoreo. Se recomienda solo cuando el vehículo está detenido por seguridad.',
  },
  {
    question: '¿Sirve para flotillas?',
    answer:
      '🚛 Sí, tenemos planes especiales para flotillas. La plataforma permite administrar todos tus vehículos desde un solo panel: ver ubicaciones, generar reportes de cada unidad, controlar velocidades, definir rutas y asignar conductores. Tenemos descuentos por volumen a partir de 5 unidades.',
  },
  {
    question: '¿Qué tipo de vehículos manejan?',
    answer:
      '🚗 Instalamos GPS en todo tipo de vehículos: autos particulares, camionetas, motos, camiones de carga, tractocamiones, autobuses, maquinaria pesada, embarcaciones y más. El dispositivo se adapta a cada tipo de vehículo.',
  },
  {
    question: '¿Incluye algún tipo de seguro?',
    answer:
      '📋 El servicio de rastreo GPS no incluye seguro vehicular, pero es un complemento ideal para cualquier póliza de seguro. Muchas aseguradoras ofrecen descuentos cuando el vehículo cuenta con rastreo satelital. Nosotros te proporcionamos los reportes que tu aseguradora necesite.',
  },
  {
    question: '¿Cómo es el proceso de instalación?',
    answer:
      '🔧 El proceso es muy sencillo: 1) Eliges tu plan, 2) Agendamos una cita de instalación, 3) Un técnico instala el dispositivo en tu vehículo (toma entre 30 y 60 minutos), 4) Configuramos tu cuenta en la plataforma, 5) Te enseñamos a usar la app. ¡Listo para rastrear!',
  },
  {
    question: '¿Tienen contratos a largo plazo?',
    answer:
      '📝 Nuestros planes básicos no requieren contrato a largo plazo, puedes cancelar en cualquier momento. Para planes con equipo en comodato, manejamos un compromiso mínimo de 12 meses para cubrir el costo del dispositivo. Después del primer año, continúas mes a mes.',
  },
  {
    question: '¿La plataforma tiene costo adicional?',
    answer:
      '🖥️ No, el acceso a la plataforma web y la app móvil están incluidos en tu mensualidad. No hay cobros adicionales por consultas, alertas ni reportes. El precio que te cotizamos es todo incluido.',
  },
  {
    question: '¿Ofrecen soporte técnico?',
    answer:
      '🔧 Sí, incluimos soporte técnico por WhatsApp, teléfono y correo electrónico. Nuestro horario de soporte es de lunes a viernes de 9:00 a 18:00 y sábados de 9:00 a 14:00. Para emergencias, el centro de monitoreo opera 24/7.',
  },
  {
    question: '¿Puedo compartir la ubicación con alguien más?',
    answer:
      '👥 Sí, con la función de cuentas espejo puedes compartir el acceso a la plataforma con otras personas: tu socio, familiar, gerente de flota, etc. Cada persona tiene su propio usuario y contraseña, y tú controlas qué permisos tiene cada uno.',
  },
  {
    question: '¿Qué diferencia hay entre sus planes?',
    answer:
      '📊 Nuestros planes se diferencian principalmente en: 1) Frecuencia de actualización (cada 10 seg, 30 seg o 1 min), 2) Funciones incluidas (apagado remoto, geocercas, botón de pánico), 3) Tipo de equipo (básico o premium), 4) Nivel de soporte. Para recomendarte el plan ideal, cuéntame: ¿qué uso le darías al GPS?',
  },
];

// -----------------------------------------------------------------------------
// 4. DETALLE DE FUNCIONES GPS
// -----------------------------------------------------------------------------

export interface GPSFunctionDetail {
  id: string;
  name: string;
  emoji: string;
  description: string;
  steps: string[];
}

export const GPS_FUNCTIONS_DETAIL: GPSFunctionDetail[] = [
  {
    id: 'atencion_automatica',
    name: 'Atención automática',
    emoji: '💬',
    description:
      'El chatbot responde instantáneamente cuando un cliente envía un mensaje por WhatsApp. Resuelve preguntas frecuentes, explica servicios y guía al cliente sin tiempos de espera.',
    steps: [
      'El cliente escribe por WhatsApp (ej: "Hola, ¿tienen GPS para carro?")',
      'El chatbot lo saluda y le pregunta qué necesita',
      'Responde preguntas sobre servicios, precios, cobertura, instalación',
      'Si la pregunta es compleja, transfiere a un asesor humano con resumen',
    ],
  },
  {
    id: 'recomendacion_servicio',
    name: 'Recomendación del servicio ideal',
    emoji: '🎯',
    description:
      'El chatbot hace preguntas estratégicas para entender la necesidad del cliente y recomendar el plan o servicio más adecuado.',
    steps: [
      'Pregunta si es vehículo particular o flotilla',
      'Pregunta cuántas unidades necesita monitorear',
      'Pregunta el tipo de vehículos (auto, camioneta, camión, moto)',
      'Pregunta si necesita funciones especiales (apagado remoto, botón de pánico)',
      'Pregunta el uso principal (seguridad, control de personal, logística)',
      'Recomienda el plan más adecuado con explicación clara',
    ],
  },
  {
    id: 'captura_prospectos',
    name: 'Captura de prospectos',
    emoji: '📋',
    description:
      'El chatbot recopila los datos del cliente interesado de forma natural durante la conversación, sin que se sienta como un formulario.',
    steps: [
      'Detecta que el cliente tiene interés real (pregunta precios, pide cotización)',
      'Solicita nombre de forma natural ("¿Con quién tengo el gusto?")',
      'Pregunta nombre de la empresa o si es particular',
      'Solicita ciudad o zona para asignar el técnico más cercano',
      'Pide número de contacto si es diferente al de WhatsApp',
      'Guarda toda la información en la base de datos como prospecto',
    ],
  },
  {
    id: 'solicitud_cotizacion',
    name: 'Solicitud de cotización',
    emoji: '💰',
    description:
      'El chatbot recopila todos los datos necesarios para generar una cotización personalizada y la envía al área de ventas.',
    steps: [
      'Confirma el servicio de interés del cliente',
      'Recopila datos técnicos: tipo y cantidad de vehículos',
      'Pregunta funciones adicionales requeridas',
      'Confirma la ciudad de instalación',
      'Genera un resumen de la solicitud de cotización',
      'Envía al vendedor con todos los datos organizados',
      'Confirma al cliente que recibirá su cotización',
    ],
  },
  {
    id: 'demo_plataforma',
    name: 'Demostración de plataforma',
    emoji: '🖥️',
    description:
      'El chatbot muestra las funciones de la plataforma de rastreo mediante descripciones, capturas y enlaces de demostración.',
    steps: [
      'Muestra las funciones principales de la plataforma',
      'Describe cada función con ejemplos prácticos',
      'Ofrece acceso a una cuenta demo de prueba',
      'Explica cómo se ve el mapa en tiempo real',
      'Muestra ejemplos de reportes y alertas',
      'Invita a agendar una demostración en vivo con un asesor',
    ],
  },
  {
    id: 'soporte_inicial',
    name: 'Soporte técnico inicial',
    emoji: '🔧',
    description:
      'El chatbot atiende consultas de clientes existentes: problemas con el GPS, preguntas sobre la plataforma y solicitudes de servicio.',
    steps: [
      'Identifica si el cliente ya tiene servicio activo',
      'Pregunta el tipo de problema o consulta',
      'Ofrece soluciones para problemas comunes (app no carga, no ve el vehículo)',
      'Recopila datos del problema si no puede resolverlo',
      'Transfiere a soporte técnico humano con resumen del caso',
      'Agenda cita de revisión técnica si es necesario',
    ],
  },
];

// -----------------------------------------------------------------------------
// 5. PREGUNTAS DE RECOMENDACIÓN DE PLAN GPS
// -----------------------------------------------------------------------------

export interface RecommendationQuestion {
  id: string;
  question: string;
  options?: string[];
  purpose: string;
}

export const GPS_RECOMMENDATION_QUESTIONS: RecommendationQuestion[] = [
  {
    id: 'tipo_uso',
    question: '¿El GPS sería para un vehículo particular o para una flotilla de empresa?',
    options: ['Vehículo particular', 'Flotilla de empresa'],
    purpose: 'Determinar si es cliente particular o empresarial',
  },
  {
    id: 'cantidad_unidades',
    question: '¿Cuántas unidades o vehículos necesitas monitorear?',
    options: ['1 vehículo', '2 a 5 vehículos', '6 a 20 vehículos', 'Más de 20 vehículos'],
    purpose: 'Calcular volumen y posibles descuentos',
  },
  {
    id: 'tipo_vehiculos',
    question: '¿Qué tipo de vehículos son?',
    options: ['Auto sedán', 'Camioneta', 'Camión de carga', 'Motocicleta', 'Tractocamión', 'Maquinaria', 'Otro'],
    purpose: 'Determinar el tipo de instalación necesaria',
  },
  {
    id: 'apagado_remoto',
    question: '¿Te interesa la función de apagado remoto del motor?',
    options: ['Sí, es importante', 'No, no la necesito', 'Me gustaría saber más'],
    purpose: 'Identificar si necesita instalación especial',
  },
  {
    id: 'uso_principal',
    question: '¿Cuál es el uso principal que le darías al GPS?',
    options: ['Seguridad contra robo', 'Control de empleados/conductores', 'Logística y rutas', 'Monitoreo familiar', 'Todo lo anterior'],
    purpose: 'Recomendar el plan más adecuado',
  },
  {
    id: 'geocercas',
    question: '¿Necesitas definir zonas permitidas o prohibidas (geocercas)?',
    options: ['Sí', 'No', '¿Qué es eso?'],
    purpose: 'Determinar si necesita geocercas',
  },
  {
    id: 'reportes',
    question: '¿Necesitas reportes de recorridos, velocidad y uso de los vehículos?',
    options: ['Sí, es fundamental', 'Sería útil pero no indispensable', 'No lo necesito'],
    purpose: 'Determinar nivel de plan requerido',
  },
  {
    id: 'ciudad',
    question: '¿En qué ciudad o estado se encuentran los vehículos?',
    purpose: 'Asignar técnico de instalación y verificar cobertura',
  },
  {
    id: 'presupuesto',
    question: '¿Tienes un presupuesto estimado en mente para la mensualidad?',
    options: ['Menos de $200/mes', '$200 a $400/mes', '$400 a $700/mes', 'Más de $700/mes', 'No tengo un presupuesto definido'],
    purpose: 'Ajustar la recomendación al presupuesto del cliente',
  },
];

// -----------------------------------------------------------------------------
// 6. FUNCIONES DE LA PLATAFORMA GPS
// -----------------------------------------------------------------------------

export interface PlatformFeature {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export const GPS_PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: 'ubicacion_real',
    name: 'Ubicación en tiempo real',
    emoji: '📍',
    description: 'Consulta la posición exacta de cada vehículo en el mapa con actualizaciones cada 10 segundos.',
  },
  {
    id: 'historial_recorridos',
    name: 'Historial de recorridos',
    emoji: '🗺️',
    description: 'Reproduce los recorridos de cualquier vehículo en un rango de fechas. Ve por dónde pasó, dónde se detuvo y cuánto tiempo estuvo en cada punto.',
  },
  {
    id: 'geocercas_plat',
    name: 'Geocercas',
    emoji: '🔲',
    description: 'Dibuja zonas en el mapa y recibe alertas cuando un vehículo entre o salga de esas áreas. Ideal para rutas fijas y zonas restringidas.',
  },
  {
    id: 'alertas_velocidad_plat',
    name: 'Alertas de velocidad',
    emoji: '⚡',
    description: 'Configura un límite de velocidad y recibe notificaciones al instante cuando un conductor lo exceda.',
  },
  {
    id: 'alertas_encendido',
    name: 'Alertas de encendido',
    emoji: '🔑',
    description: 'Recibe una notificación cada vez que el vehículo se encienda o se apague fuera de horarios autorizados.',
  },
  {
    id: 'alertas_movimiento',
    name: 'Alertas de movimiento',
    emoji: '🚨',
    description: 'Activa alertas de movimiento cuando el vehículo se mueva fuera de horario o sin autorización.',
  },
  {
    id: 'boton_panico_plat',
    name: 'Botón de pánico',
    emoji: '🆘',
    description: 'El conductor puede presionar un botón de emergencia que envía su ubicación al centro de monitoreo y a los contactos registrados.',
  },
  {
    id: 'apagado_remoto_plat',
    name: 'Apagado remoto',
    emoji: '🔴',
    description: 'Apaga el motor del vehículo a distancia desde la app o la plataforma web. Solo funciona cuando el vehículo está detenido.',
  },
  {
    id: 'reportes_conduccion',
    name: 'Reportes de conducción',
    emoji: '📊',
    description: 'Reportes detallados por conductor: velocidad promedio, frenados bruscos, aceleraciones, tiempo de conducción y descansos.',
  },
  {
    id: 'control_flotillas_plat',
    name: 'Control de flotillas',
    emoji: '🚛',
    description: 'Panel de administración para ver todos los vehículos de la empresa en un solo mapa. Filtra por grupos, rutas o conductores.',
  },
  {
    id: 'admin_usuarios',
    name: 'Administración de usuarios',
    emoji: '👤',
    description: 'Crea usuarios con diferentes permisos: administrador, supervisor, consulta. Cada usuario ve solo lo que le corresponde.',
  },
  {
    id: 'cuentas_espejo_plat',
    name: 'Cuentas espejo',
    emoji: '👥',
    description: 'Permite que otras personas accedan a la plataforma con su propio usuario para consultar la ubicación de los vehículos asignados.',
  },
  {
    id: 'app_movil_plat',
    name: 'App móvil',
    emoji: '📲',
    description: 'Aplicación para iOS y Android con todas las funciones de la plataforma: mapa en tiempo real, alertas push, reportes y control remoto.',
  },
  {
    id: 'monitoreo_computadora',
    name: 'Monitoreo desde computadora',
    emoji: '🖥️',
    description: 'Accede a la plataforma completa desde cualquier navegador web, sin instalar software. Compatible con Windows, Mac y Linux.',
  },
  {
    id: 'reportes_descargables',
    name: 'Reportes descargables',
    emoji: '📄',
    description: 'Descarga reportes en formato PDF y Excel con datos de recorridos, velocidades, tiempos de uso y más. Ideales para control interno y auditorías.',
  },
];

// -----------------------------------------------------------------------------
// 7. PREGUNTAS DE SOPORTE PARA CLIENTES EXISTENTES
// -----------------------------------------------------------------------------

export const GPS_SUPPORT_QUESTIONS: GPSQuestion[] = [
  {
    question: 'No puedo ver mi vehículo en la plataforma',
    answer:
      '🔧 Esto puede ocurrir por varias razones: 1) El equipo GPS puede estar sin señal celular temporalmente, 2) La batería del vehículo puede estar desconectada, 3) El dispositivo puede necesitar un reinicio. Intenta cerrar y abrir la app. Si el problema persiste, necesitamos revisar tu equipo. ¿Me puedes compartir tu número de cliente o placas del vehículo?',
  },
  {
    question: 'La app no me carga o está lenta',
    answer:
      '📲 Te recomiendo: 1) Verificar tu conexión a internet, 2) Cerrar la app completamente y volver a abrirla, 3) Verificar que tengas la última versión instalada, 4) Si usas datos móviles, intenta con WiFi. Si el problema continúa, envíame una captura de pantalla del error.',
  },
  {
    question: 'Quiero cambiar mi contraseña',
    answer:
      '🔑 Puedes cambiar tu contraseña desde la app: ve a Configuración > Mi cuenta > Cambiar contraseña. Si no puedes acceder, envíame tu correo registrado y te enviaremos un enlace para restablecerla.',
  },
  {
    question: 'El GPS marca una ubicación incorrecta',
    answer:
      '📍 Si el GPS marca una ubicación diferente a la real, puede deberse a: 1) El vehículo está en una zona con poca señal, 2) El dispositivo está en proceso de reconexión, 3) El equipo necesita calibración. Espera unos minutos y actualiza. Si persiste, agenda una revisión técnica.',
  },
  {
    question: 'Quiero agregar otro vehículo a mi cuenta',
    answer:
      '➕ ¡Con gusto! Para agregar un vehículo necesitamos: 1) Tipo de vehículo (auto, camioneta, etc.), 2) Marca, modelo y año, 3) Número de placas, 4) Dirección para la instalación. Te cotizamos el equipo adicional y agendamos la instalación. ¿Me proporcionas los datos?',
  },
  {
    question: 'Quiero cancelar mi servicio',
    answer:
      '📋 Lamento escuchar eso. Antes de procesar la cancelación, me gustaría saber: ¿hay algo que podamos mejorar? Si tu decisión es definitiva, necesito que nos contactes por teléfono al número de atención para verificar tu identidad y procesar la baja. El número es visible en tu contrato o en la app.',
  },
  {
    question: 'No recibo las alertas en mi celular',
    answer:
      '🔔 Verifica lo siguiente: 1) Que las notificaciones de la app estén activadas en la configuración de tu celular, 2) Que en la app tengas configuradas las alertas que deseas recibir, 3) Que no tengas el modo "No molestar" activado, 4) Que la app esté actualizada a la última versión.',
  },
];

// -----------------------------------------------------------------------------
// 8. EJEMPLO DE CONVERSACIÓN GPS
// -----------------------------------------------------------------------------

export interface ConversationMessage {
  role: 'client' | 'bot';
  message: string;
}

export const GPS_CONVERSATION_EXAMPLE: ConversationMessage[] = [
  {
    role: 'client',
    message: 'Hola, buenas tardes',
  },
  {
    role: 'bot',
    message:
      '¡Buenas tardes! 👋 Bienvenido a *GPS Rastreo Satelital*. Soy tu asesor virtual y estoy aquí para ayudarte.\n\n¿En qué puedo asistirte hoy?\n\n📡 Rastreo satelital\n🔒 Seguridad vehicular\n🚛 Control de flotillas\n📋 Cotizaciones\n🔧 Soporte técnico\n\nO simplemente dime con tus palabras qué necesitas 😊',
  },
  {
    role: 'client',
    message: 'Quiero poner GPS a mis camionetas',
  },
  {
    role: 'bot',
    message:
      '¡Excelente decisión! 🚛 El GPS te permitirá monitorear tus camionetas en tiempo real, controlar rutas y protegerlas contra robo.\n\nPara recomendarte el plan ideal, me gustaría hacerte algunas preguntas:\n\n¿Cuántas camionetas necesitas monitorear?',
  },
  {
    role: 'client',
    message: 'Son 8 camionetas de reparto',
  },
  {
    role: 'bot',
    message:
      '📋 Perfecto, 8 camionetas de reparto. Para flotillas a partir de 5 unidades tenemos precios especiales.\n\n¿Qué funciones son las más importantes para ti?\n\n1️⃣ Ubicación en tiempo real\n2️⃣ Control de velocidad y rutas\n3️⃣ Apagado remoto del motor\n4️⃣ Geocercas (zonas permitidas)\n5️⃣ Reportes de recorridos\n6️⃣ Todas las anteriores',
  },
  {
    role: 'client',
    message: 'Todas, pero sobre todo el control de rutas y la velocidad',
  },
  {
    role: 'bot',
    message:
      '🎯 Entendido. Para tus 8 camionetas de reparto, te recomiendo nuestro *Plan Flotilla Premium* que incluye:\n\n📍 Ubicación en tiempo real (actualización cada 10 seg)\n⚡ Alertas de velocidad configurables\n🗺️ Geocercas ilimitadas\n📊 Reportes de conducción por unidad\n🔴 Apagado remoto del motor\n📲 App móvil + plataforma web\n👥 Usuarios múltiples con permisos\n\nPara prepararte una cotización personalizada, necesito algunos datos:\n\n¿En qué ciudad se encuentran las camionetas?',
  },
  {
    role: 'client',
    message: 'Estamos en Guadalajara',
  },
  {
    role: 'bot',
    message:
      '📍 Guadalajara, perfecto. Tenemos técnicos en la zona metropolitana.\n\n¿Me puedes compartir tu nombre y el nombre de tu empresa para preparar la cotización?',
  },
  {
    role: 'client',
    message: 'Soy Roberto Méndez de Distribuidora del Bajío',
  },
  {
    role: 'bot',
    message:
      '✅ Gracias Roberto. Tengo los datos para tu cotización:\n\n📋 *Resumen de solicitud:*\n• *Cliente:* Roberto Méndez\n• *Empresa:* Distribuidora del Bajío\n• *Ciudad:* Guadalajara\n• *Unidades:* 8 camionetas de reparto\n• *Plan:* Flotilla Premium\n• *Funciones:* Todas (énfasis en rutas y velocidad)\n\nUn asesor de ventas te contactará en las próximas 2 horas con tu cotización detallada.\n\n¿Prefieres que te contactemos por este mismo WhatsApp o tienes otro número?',
  },
  {
    role: 'client',
    message: 'Por este mismo WhatsApp está bien, gracias',
  },
  {
    role: 'bot',
    message:
      '¡Perfecto Roberto! 👍 Tu solicitud ha sido registrada. Un asesor se pondrá en contacto contigo por este WhatsApp con la cotización para tus 8 camionetas.\n\nMientras tanto, si tienes alguna otra pregunta, no dudes en escribirme. ¡Que tengas excelente tarde! 😊',
  },
];
