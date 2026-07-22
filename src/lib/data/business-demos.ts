// =============================================================================
// BUSINESS DEMOS - Demostraciones por tipo de negocio
// =============================================================================

// -----------------------------------------------------------------------------
// Interfaz de demostración de negocio
// -----------------------------------------------------------------------------

export interface BusinessDemo {
  name: string;
  emoji: string;
  description: string;
  capabilities: string[];
  exampleConversation: Array<{ role: 'client' | 'bot'; message: string }>;
  dataToCollect: string[];
}

// -----------------------------------------------------------------------------
// DEMOS POR TIPO DE NEGOCIO
// -----------------------------------------------------------------------------

export const BUSINESS_DEMOS: Record<string, BusinessDemo> = {
  // =========================================================================
  // CLÍNICAS Y CONSULTORIOS
  // =========================================================================
  clinic: {
    name: 'Clínicas y consultorios',
    emoji: '🏥',
    description:
      'Un chatbot para clínicas y consultorios médicos atiende pacientes desde el primer contacto: explica servicios, agenda citas, envía recordatorios y recopila datos del paciente antes de la consulta.',
    capabilities: [
      'Explicar servicios médicos disponibles por especialidad',
      'Mostrar horarios de atención de cada doctor o especialista',
      'Solicitar y agendar citas médicas con fecha y hora',
      'Recopilar datos del paciente (nombre, edad, síntomas, seguro médico)',
      'Indicar ubicaciones de sucursales y cómo llegar',
      'Enviar recordatorios de citas próximas por WhatsApp',
      'Transferir a recepción cuando el caso lo requiera',
      'Informar sobre preparación previa a estudios o procedimientos',
      'Consultar disponibilidad de doctores por especialidad',
    ],
    exampleConversation: [
      {
        role: 'client',
        message: 'Hola, necesito una cita con un dentista',
      },
      {
        role: 'bot',
        message:
          '¡Hola! 👋 Bienvenido a *Clínica Dental Sonríe*. Con gusto te ayudo a agendar tu cita.\n\n🦷 Contamos con las siguientes especialidades dentales:\n\n1️⃣ Odontología general\n2️⃣ Ortodoncia\n3️⃣ Endodoncia\n4️⃣ Cirugía maxilofacial\n5️⃣ Periodoncia\n6️⃣ Odontopediatría\n\n¿Cuál necesitas o prefieres que te oriente?',
      },
      {
        role: 'client',
        message: 'Me duele una muela, creo que necesito odontología general',
      },
      {
        role: 'bot',
        message:
          '😟 Lamento que tengas dolor. Te agendo con nuestro especialista en odontología general para una revisión.\n\n📅 Tenemos estos horarios disponibles esta semana:\n\n• Martes 15 — 10:00 AM, 2:00 PM\n• Miércoles 16 — 9:00 AM, 11:00 AM, 4:00 PM\n• Jueves 17 — 10:00 AM, 3:00 PM\n\n¿Cuál te conviene más?',
      },
      {
        role: 'client',
        message: 'El miércoles a las 9 de la mañana',
      },
      {
        role: 'bot',
        message:
          '✅ Perfecto. Para confirmar tu cita necesito algunos datos:\n\n1️⃣ ¿Tu nombre completo?\n2️⃣ ¿Es tu primera visita con nosotros?\n3️⃣ ¿Cuentas con algún seguro dental?',
      },
      {
        role: 'client',
        message: 'María González, sí es la primera vez y tengo seguro GNP',
      },
      {
        role: 'bot',
        message:
          '📋 ¡Listo María! Tu cita está confirmada:\n\n🦷 *Cita de odontología general*\n📅 Miércoles 16 — 9:00 AM\n👩 Paciente: María González\n🏥 Primera visita\n💳 Seguro: GNP\n\nTe enviaremos un recordatorio el día anterior. Por favor llega 15 minutos antes para tu registro.\n\n¿Necesitas algo más? 😊',
      },
    ],
    dataToCollect: [
      'Nombre completo del paciente',
      'Teléfono de contacto',
      'Especialidad requerida',
      'Síntomas o motivo de consulta',
      'Fecha y hora preferida',
      'Seguro médico (si aplica)',
      'Primera visita o paciente recurrente',
      'Sucursal de preferencia',
    ],
  },

  // =========================================================================
  // VENTA DE EQUIPOS MÉDICOS
  // =========================================================================
  medical_equipment: {
    name: 'Venta de equipos médicos',
    emoji: '🩺',
    description:
      'Un chatbot para venta de equipos médicos ayuda a doctores, clínicas y hospitales a encontrar el equipo ideal, comparar modelos, consultar precios y solicitar cotizaciones de manera rápida.',
    capabilities: [
      'Buscar equipos médicos por especialidad o tipo',
      'Mostrar modelos disponibles con especificaciones técnicas',
      'Comparar características entre dos o más equipos',
      'Consultar precios y formas de pago',
      'Solicitar cotizaciones formales con datos del comprador',
      'Detectar presupuesto del cliente para ajustar recomendaciones',
      'Transferir a vendedores especializados por tipo de equipo',
      'Informar sobre garantías, capacitación y servicio técnico',
      'Enviar fichas técnicas en PDF',
    ],
    exampleConversation: [
      {
        role: 'client',
        message: 'Busco un ultrasonido para mi consultorio',
      },
      {
        role: 'bot',
        message:
          '🩺 ¡Hola! Con gusto te ayudo a encontrar el ultrasonido ideal para tu consultorio.\n\nPara recomendarte el equipo más adecuado, necesito saber:\n\n1️⃣ ¿Qué especialidad manejas? (ginecología, medicina general, cardiología, etc.)\n2️⃣ ¿Buscas un equipo portátil o de piso?\n3️⃣ ¿Tienes un presupuesto estimado?',
      },
      {
        role: 'client',
        message: 'Soy ginecólogo, necesito uno portátil, presupuesto de unos 80 mil',
      },
      {
        role: 'bot',
        message:
          '📋 Perfecto. Para ginecología con uso portátil y presupuesto de $80,000, te recomiendo estos modelos:\n\n1️⃣ *UltraScan P200* — $72,000\n   • Portátil, pantalla 12", sonda convexa y transvaginal incluidas\n   • Doppler color, modo 3D/4D\n\n2️⃣ *MedEcho Compact G5* — $85,000\n   • Ultraportátil, pantalla 15", 3 sondas incluidas\n   • Doppler pulsado, modo 4D, WiFi integrado\n\n¿Te gustaría conocer más detalles de alguno o solicitar una cotización formal?',
      },
      {
        role: 'client',
        message: 'El MedEcho suena bien, ¿tienen financiamiento?',
      },
      {
        role: 'bot',
        message:
          '💰 Sí, manejamos varias opciones de pago para el *MedEcho Compact G5*:\n\n• Contado: $85,000 (incluye capacitación gratuita)\n• 3 meses sin intereses: $28,333/mes\n• 6 meses: $14,800/mes\n• 12 meses: $7,800/mes\n\nTodos incluyen garantía de 2 años y servicio técnico.\n\nPara enviarte una cotización formal, ¿me puedes compartir tu nombre, tu clínica y ciudad?',
      },
    ],
    dataToCollect: [
      'Nombre del doctor o responsable de compras',
      'Nombre de la clínica, hospital o consultorio',
      'Especialidad médica',
      'Tipo de equipo que busca',
      'Presupuesto estimado',
      'Ciudad y estado',
      'Forma de pago preferida',
      'Correo electrónico para cotización',
    ],
  },

  // =========================================================================
  // INMOBILIARIAS
  // =========================================================================
  real_estate: {
    name: 'Inmobiliarias',
    emoji: '🏠',
    description:
      'Un chatbot inmobiliario atiende compradores y arrendatarios las 24 horas, filtra propiedades según necesidades, muestra fotos y características, y agenda visitas con el asesor correspondiente.',
    capabilities: [
      'Mostrar propiedades disponibles según filtros del cliente',
      'Filtrar por ciudad, zona, colonia o desarrollo',
      'Consultar presupuesto para ajustar opciones',
      'Distinguir entre compra y renta',
      'Mostrar características, fotos y planos de cada propiedad',
      'Solicitar y agendar visitas a propiedades',
      'Asignar el asesor inmobiliario correspondiente por zona',
      'Informar sobre créditos hipotecarios y financiamiento',
      'Enviar fichas de propiedades en PDF',
    ],
    exampleConversation: [
      {
        role: 'client',
        message: 'Hola, busco una casa en Querétaro',
      },
      {
        role: 'bot',
        message:
          '🏠 ¡Hola! Bienvenido a *Inmobiliaria Hogar Plus*. Te ayudo a encontrar tu propiedad ideal en Querétaro.\n\nPara mostrarte las mejores opciones, necesito saber:\n\n1️⃣ ¿Buscas *comprar* o *rentar*?\n2️⃣ ¿Qué tipo de propiedad? (casa, departamento, terreno)\n3️⃣ ¿Cuántas recámaras necesitas?\n4️⃣ ¿Tienes un presupuesto aproximado?',
      },
      {
        role: 'client',
        message: 'Comprar una casa de 3 recámaras, presupuesto de 2 millones',
      },
      {
        role: 'bot',
        message:
          '📍 Excelente. En Querétaro tengo estas casas de 3 recámaras dentro de tu presupuesto:\n\n1️⃣ *Residencial El Refugio* — $1,850,000\n   🏠 3 recámaras, 2.5 baños, 120 m², jardín\n   📍 Zona norte, cerca de plaza comercial\n\n2️⃣ *Fraccionamiento Zibatá* — $1,950,000\n   🏠 3 recámaras, 2 baños, 110 m², amenidades\n   📍 Zona norponiente, acceso rápido a autopista\n\n3️⃣ *Juriquilla Santa Fe* — $2,100,000\n   🏠 3 recámaras, 3 baños, 140 m², roof garden\n   📍 Zona Juriquilla, alta plusvalía\n\n¿Te gustaría agendar una visita a alguna? También puedo enviarte fotos y ficha técnica.',
      },
      {
        role: 'client',
        message: 'Me interesa la de Zibatá, ¿puedo visitarla el sábado?',
      },
      {
        role: 'bot',
        message:
          '📅 ¡Claro! Para agendar tu visita a *Fraccionamiento Zibatá* este sábado:\n\n🕐 Horarios disponibles:\n• 10:00 AM\n• 12:00 PM\n• 2:00 PM\n\n¿Cuál prefieres? Y por favor compárteme tu nombre completo para registrar la cita con nuestro asesor de la zona.',
      },
    ],
    dataToCollect: [
      'Nombre del cliente',
      'Teléfono de contacto',
      'Tipo de operación (compra o renta)',
      'Tipo de propiedad',
      'Número de recámaras',
      'Presupuesto',
      'Ciudad y zona de preferencia',
      'Características especiales requeridas',
      'Fecha preferida para visita',
    ],
  },

  // =========================================================================
  // RESTAURANTES
  // =========================================================================
  restaurant: {
    name: 'Restaurantes',
    emoji: '🍽️',
    description:
      'Un chatbot para restaurantes atiende a comensales, muestra el menú, recibe reservaciones, informa sobre promociones y puede recibir pedidos para entrega a domicilio.',
    capabilities: [
      'Mostrar el menú completo organizado por categorías',
      'Informar horarios de atención por sucursal',
      'Recibir y confirmar reservaciones de mesa',
      'Mostrar promociones y ofertas del día',
      'Recibir pedidos para entrega a domicilio o recoger',
      'Consultar sucursales y ubicaciones',
      'Resolver dudas sobre ingredientes y alérgenos',
      'Informar sobre eventos especiales y paquetes',
      'Enviar menú digital en PDF o con imágenes',
    ],
    exampleConversation: [
      {
        role: 'client',
        message: 'Hola, ¿tienen mesa para el viernes por la noche?',
      },
      {
        role: 'bot',
        message:
          '🍽️ ¡Hola! Bienvenido a *Restaurante La Hacienda*. Con gusto te ayudo con tu reservación.\n\n📅 Para el viernes por la noche, tenemos disponibilidad:\n\n🕖 7:00 PM — mesas disponibles\n🕗 8:00 PM — pocas mesas\n🕘 9:00 PM — mesas disponibles\n\n¿Cuántas personas serían y a qué hora prefieres?',
      },
      {
        role: 'client',
        message: 'Para 4 personas a las 8',
      },
      {
        role: 'bot',
        message:
          '✅ Perfecto, mesa para 4 personas el viernes a las 8:00 PM.\n\nPara confirmar tu reservación, necesito:\n\n1️⃣ ¿Tu nombre?\n2️⃣ ¿Es alguna celebración especial? (cumpleaños, aniversario)\n3️⃣ ¿Algún requerimiento especial? (silla para bebé, zona terraza, etc.)',
      },
      {
        role: 'client',
        message: 'Carlos Ramírez, es un cumpleaños, si tienen terraza mejor',
      },
      {
        role: 'bot',
        message:
          '🎉 ¡Felicidades al cumpleañero! Tu reservación está confirmada:\n\n📋 *Reservación confirmada*\n👤 Carlos Ramírez\n📅 Viernes — 8:00 PM\n👥 4 personas\n📍 Zona terraza\n🎂 Celebración de cumpleaños\n\nTe enviaremos un recordatorio el jueves. ¿Te gustaría ver nuestro menú o conocer nuestro paquete de cumpleaños? 🎁',
      },
    ],
    dataToCollect: [
      'Nombre para la reservación',
      'Número de personas',
      'Fecha y hora',
      'Sucursal preferida',
      'Ocasión especial',
      'Requerimientos especiales',
      'Teléfono de contacto',
      'Preferencias alimenticias o restricciones',
    ],
  },

  // =========================================================================
  // TALLERES MECÁNICOS
  // =========================================================================
  workshop: {
    name: 'Talleres mecánicos',
    emoji: '🔧',
    description:
      'Un chatbot para talleres mecánicos identifica el problema del vehículo, solicita información relevante, agenda revisiones y prepara presupuestos preliminares.',
    capabilities: [
      'Identificar el problema o síntoma del vehículo',
      'Solicitar marca, modelo y año del vehículo',
      'Agendar citas para revisión o servicio',
      'Preparar cotizaciones preliminares de servicios comunes',
      'Explicar servicios disponibles (mecánica, eléctrico, carrocería)',
      'Enviar recordatorios de servicio programado',
      'Informar sobre tiempos estimados de reparación',
      'Transferir a un mecánico especializado para diagnóstico',
      'Consultar status de vehículos en reparación',
    ],
    exampleConversation: [
      {
        role: 'client',
        message: 'Mi carro hace un ruido raro cuando freno',
      },
      {
        role: 'bot',
        message:
          '🔧 Entiendo, un ruido al frenar puede indicar varias cosas. Vamos a identificar el problema:\n\n¿Podrías describirme el ruido?\n\n1️⃣ Chillido o rechinido agudo\n2️⃣ Golpeteo o traqueteo\n3️⃣ Vibración en el pedal al frenar\n4️⃣ Ruido metálico de roce\n\n¿Cuál se parece más a lo que escuchas?',
      },
      {
        role: 'client',
        message: 'Es como un rechinido agudo',
      },
      {
        role: 'bot',
        message:
          '📋 Un rechinido agudo al frenar generalmente indica que las *balatas (pastillas de freno)* necesitan cambio. Es un problema común y su reparación es relativamente rápida.\n\nPara prepararte un presupuesto, necesito saber:\n\n🚗 ¿Qué marca, modelo y año es tu vehículo?',
      },
      {
        role: 'client',
        message: 'Honda Civic 2019',
      },
      {
        role: 'bot',
        message:
          '✅ *Honda Civic 2019* — Cambio de balatas:\n\n💰 *Presupuesto estimado:*\n• Balatas delanteras: $800 - $1,200\n• Balatas traseras: $700 - $1,000\n• Revisión de discos: incluida\n• Mano de obra: incluida\n\n⏱️ Tiempo estimado: 1 a 2 horas\n\n📅 ¿Te gustaría agendar una revisión? Tenemos disponibilidad mañana y pasado mañana. Un mecánico revisará el estado completo de tus frenos antes de confirmar el presupuesto final.',
      },
    ],
    dataToCollect: [
      'Nombre del cliente',
      'Teléfono de contacto',
      'Marca, modelo y año del vehículo',
      'Síntoma o problema reportado',
      'Fecha preferida para revisión',
      'Tipo de servicio requerido',
      'Urgencia del problema',
      'Dirección (si ofrecen servicio a domicilio)',
    ],
  },

  // =========================================================================
  // TIENDAS
  // =========================================================================
  store: {
    name: 'Tiendas',
    emoji: '🛍️',
    description:
      'Un chatbot para tiendas muestra productos, recomienda artículos según necesidades, crea pedidos, informa sobre envíos y recupera carritos abandonados.',
    capabilities: [
      'Mostrar productos organizados por categoría',
      'Recomendar artículos según necesidades y preferencias',
      'Consultar precios y disponibilidad en tiempo real',
      'Crear pedidos y procesar solicitudes de compra',
      'Informar métodos de pago aceptados',
      'Consultar costos y tiempos de envío',
      'Recuperar carritos abandonados con recordatorios',
      'Mostrar promociones y descuentos vigentes',
      'Procesar consultas sobre devoluciones y garantías',
    ],
    exampleConversation: [
      {
        role: 'client',
        message: 'Hola, busco un regalo para mi mamá',
      },
      {
        role: 'bot',
        message:
          '🎁 ¡Qué lindo detalle! Te ayudo a encontrar el regalo perfecto.\n\nPara recomendarte algo ideal, dime:\n\n1️⃣ ¿Qué tipo de productos le gustan? (joyería, bolsas, perfumes, ropa, decoración)\n2️⃣ ¿Tienes un presupuesto en mente?\n3️⃣ ¿Es para alguna ocasión especial?',
      },
      {
        role: 'client',
        message: 'Algo de joyería, máximo $500, es para el día de las madres',
      },
      {
        role: 'bot',
        message:
          '💎 ¡Excelente elección! Para el Día de las Madres con presupuesto de $500, te recomiendo:\n\n1️⃣ *Collar de plata con dije de corazón* — $380\n   ✨ Plata .925, cadena de 45 cm\n\n2️⃣ *Aretes de cristal Swarovski* — $450\n   ✨ Baño de oro rosa, estuche de regalo incluido\n\n3️⃣ *Set collar + aretes "Mamá"* — $520\n   ✨ Acero inoxidable, diseño elegante, empaque premium\n\n¿Te gustaría ver fotos de alguno o agregarlo al carrito? 🛒',
      },
      {
        role: 'client',
        message: 'Los aretes de Swarovski, ¿hacen envíos?',
      },
      {
        role: 'bot',
        message:
          '📦 Sí, hacemos envíos a todo México:\n\n• *Envío estándar:* 3-5 días hábiles — $99\n• *Envío express:* 1-2 días hábiles — $149\n• *Envío gratis* en compras mayores a $500\n\nTus *Aretes de cristal Swarovski* ($450) + envío estándar ($99) = *$549*\n\nO si agregas algo más para llegar a $500 en producto, ¡el envío es gratis! 🎉\n\n¿Quieres proceder con el pedido?',
      },
    ],
    dataToCollect: [
      'Nombre del cliente',
      'Dirección de envío',
      'Teléfono de contacto',
      'Productos seleccionados',
      'Método de pago preferido',
      'Tipo de envío',
      'Notas especiales del pedido',
      'Correo para confirmación',
    ],
  },

  // =========================================================================
  // ESCUELAS Y CURSOS
  // =========================================================================
  school: {
    name: 'Escuelas y cursos',
    emoji: '🎓',
    description:
      'Un chatbot para escuelas y centros de capacitación muestra programas educativos, explica costos, gestiona inscripciones y responde todas las dudas de los aspirantes.',
    capabilities: [
      'Mostrar programas educativos, cursos y talleres disponibles',
      'Explicar costos, becas y formas de pago',
      'Consultar fechas de inicio y calendario escolar',
      'Recopilar datos para preinscripción o inscripción',
      'Informar requisitos de ingreso y documentación',
      'Enviar al área de admisiones o coordinación correspondiente',
      'Mostrar instalaciones y servicios',
      'Resolver dudas sobre modalidad (presencial, en línea, híbrido)',
      'Compartir información de eventos y puertas abiertas',
    ],
    exampleConversation: [
      {
        role: 'client',
        message: 'Hola, me interesan sus cursos de inglés',
      },
      {
        role: 'bot',
        message:
          '🎓 ¡Hola! Bienvenido al *Instituto de Idiomas Global*. Nuestros cursos de inglés son los más solicitados.\n\nContamos con estos niveles:\n\n1️⃣ *Básico* (A1-A2) — Para principiantes\n2️⃣ *Intermedio* (B1-B2) — Conversación y gramática\n3️⃣ *Avanzado* (C1-C2) — Fluidez y certificación\n4️⃣ *Business English* — Inglés para negocios\n5️⃣ *Preparación TOEFL/IELTS* — Certificaciones internacionales\n\n¿Ya tienes algún nivel de inglés o partes desde cero?',
      },
      {
        role: 'client',
        message: 'Algo básico, pero quiero mejorar para el trabajo',
      },
      {
        role: 'bot',
        message:
          '📚 Perfecto. Para tu nivel y objetivo, te recomiendo iniciar en el *Nivel Intermedio (B1)* con enfoque en conversación para el entorno laboral.\n\n📅 *Próximo inicio:* 1 de agosto\n🕐 *Horarios disponibles:*\n• Lunes y miércoles 7:00 - 9:00 PM\n• Martes y jueves 6:00 - 8:00 PM\n• Sábados 9:00 AM - 1:00 PM\n\n💰 *Inversión:* $2,800/mes (material incluido)\n📍 *Modalidad:* Presencial y en línea\n\n¿Te gustaría inscribirte o tienes alguna pregunta sobre el curso?',
      },
      {
        role: 'client',
        message: '¿Qué necesito para inscribirme?',
      },
      {
        role: 'bot',
        message:
          '📋 Para inscribirte necesitas:\n\n1️⃣ Llenar el formulario de inscripción (te lo envío por aquí)\n2️⃣ Presentar identificación oficial (INE o pasaporte)\n3️⃣ Realizar el examen de ubicación (gratuito, 20 minutos)\n4️⃣ Pagar la inscripción de $500 + primera mensualidad\n\n🎁 *Promoción vigente:* Inscripción GRATIS si te registras esta semana.\n\n¿Quieres que te agende tu examen de ubicación? Solo necesito tu nombre y horario preferido.',
      },
    ],
    dataToCollect: [
      'Nombre del aspirante',
      'Teléfono de contacto',
      'Correo electrónico',
      'Programa o curso de interés',
      'Nivel actual (si aplica)',
      'Horario preferido',
      'Modalidad preferida (presencial, en línea, híbrido)',
      'Fecha de inicio deseada',
      'Cómo se enteró del instituto',
    ],
  },

  // =========================================================================
  // EMPRESAS DE SEGURIDAD
  // =========================================================================
  security: {
    name: 'Empresas de seguridad',
    emoji: '🔐',
    description:
      'Un chatbot para empresas de seguridad explica sistemas de cámaras, alarmas y monitoreo, recomienda la solución ideal según el inmueble y agenda visitas técnicas para cotización.',
    capabilities: [
      'Explicar sistemas de cámaras de seguridad (CCTV)',
      'Mostrar tipos de alarmas disponibles',
      'Recomendar soluciones según el tipo de inmueble',
      'Solicitar y agendar visitas técnicas de evaluación',
      'Preparar cotizaciones basadas en las necesidades',
      'Recopilar información del inmueble a proteger',
      'Informar sobre monitoreo 24/7 y respuesta a emergencias',
      'Comparar paquetes de seguridad',
      'Explicar garantías y servicio de mantenimiento',
    ],
    exampleConversation: [
      {
        role: 'client',
        message: 'Necesito cámaras de seguridad para mi negocio',
      },
      {
        role: 'bot',
        message:
          '🔐 ¡Hola! En *Seguridad Total* te ayudamos a proteger tu negocio con los mejores sistemas.\n\nPara recomendarte la solución ideal, necesito conocer algunos detalles:\n\n1️⃣ ¿Qué tipo de negocio es? (tienda, restaurante, oficina, bodega, etc.)\n2️⃣ ¿Cuántos metros cuadrados aproximadamente?\n3️⃣ ¿Tienes algún sistema de seguridad actualmente?',
      },
      {
        role: 'client',
        message: 'Es una tienda de abarrotes, como de 80 metros, no tengo nada de seguridad',
      },
      {
        role: 'bot',
        message:
          '📋 Para tu tienda de abarrotes de 80 m² te recomiendo nuestro *Paquete Negocio Básico*:\n\n📹 *4 cámaras HD* (2 interiores + 2 exteriores)\n🔔 *Alarma perimetral* con sensores de movimiento\n📱 *Monitoreo desde tu celular* las 24 horas\n💾 *Grabación en DVR* con almacenamiento de 30 días\n🌙 *Visión nocturna* en todas las cámaras\n\n💰 *Precio de instalación:* $8,500\n💰 *Mensualidad de monitoreo:* $450/mes\n\nPara darte una cotización exacta, necesitamos hacer una *visita técnica gratuita* a tu tienda. ¿Te gustaría agendarla?',
      },
      {
        role: 'client',
        message: 'Sí, ¿pueden venir esta semana?',
      },
      {
        role: 'bot',
        message:
          '📅 ¡Claro! Tenemos disponibilidad esta semana:\n\n• Jueves 17 — 10:00 AM a 12:00 PM\n• Viernes 18 — 2:00 PM a 4:00 PM\n• Sábado 19 — 10:00 AM a 12:00 PM\n\nLa visita es *totalmente gratuita* y sin compromiso. Un técnico evaluará tu tienda y te entrega la cotización en el momento.\n\nPara agendar necesito:\n1️⃣ Tu nombre\n2️⃣ Dirección de la tienda\n3️⃣ Horario que prefieras',
      },
    ],
    dataToCollect: [
      'Nombre del propietario o responsable',
      'Nombre del negocio',
      'Tipo de inmueble',
      'Metros cuadrados aproximados',
      'Dirección completa',
      'Sistema de seguridad actual (si tiene)',
      'Necesidades específicas',
      'Presupuesto estimado',
      'Fecha preferida para visita técnica',
    ],
  },

  // =========================================================================
  // SERVICIOS PROFESIONALES
  // =========================================================================
  professional: {
    name: 'Servicios profesionales',
    emoji: '💼',
    description:
      'Un chatbot para despachos y profesionistas independientes (abogados, contadores, arquitectos, etc.) atiende consultas iniciales, explica servicios, recopila datos del caso y agenda consultas.',
    capabilities: [
      'Explicar servicios profesionales disponibles',
      'Identificar el tipo de servicio que necesita el cliente',
      'Recopilar datos preliminares del caso o proyecto',
      'Agendar consultas iniciales o de evaluación',
      'Informar sobre tarifas y formas de pago',
      'Enviar documentación necesaria para el trámite',
      'Responder preguntas frecuentes del área profesional',
      'Transferir al profesional especializado según el caso',
      'Dar seguimiento a trámites en proceso',
    ],
    exampleConversation: [
      {
        role: 'client',
        message: 'Buenas tardes, necesito un abogado para un asunto laboral',
      },
      {
        role: 'bot',
        message:
          '💼 Buenas tardes. Bienvenido al *Despacho Jurídico Lex & Asociados*. Contamos con abogados especializados en derecho laboral.\n\nPara orientarte mejor, ¿podrías indicarme de qué se trata tu caso?\n\n1️⃣ Despido injustificado\n2️⃣ Liquidación o finiquito\n3️⃣ Demanda laboral (tú demandas)\n4️⃣ Te están demandando\n5️⃣ Asesoría para empresa (contratos, nómina)\n6️⃣ Otro asunto laboral',
      },
      {
        role: 'client',
        message: 'Me corrieron sin liquidación',
      },
      {
        role: 'bot',
        message:
          '📋 Entiendo, un despido sin liquidación es un caso donde probablemente tienes derecho a recibir una compensación.\n\nPara que nuestro abogado laboralista evalúe tu caso, necesito saber:\n\n1️⃣ ¿Cuánto tiempo trabajaste en la empresa?\n2️⃣ ¿Tenías contrato firmado?\n3️⃣ ¿Estabas dado de alta en el IMSS?\n4️⃣ ¿Hace cuánto te despidieron?\n\nEsta información nos ayuda a preparar tu consulta inicial, que tiene un costo de $500 y se descuenta si decides contratar nuestros servicios.',
      },
      {
        role: 'client',
        message: 'Trabajé 3 años, sí tenía contrato y estaba en el IMSS, me despidieron hace 2 semanas',
      },
      {
        role: 'bot',
        message:
          '✅ Gracias por la información. Con 3 años de antigüedad, contrato y registro en IMSS, tu caso tiene muy buenas bases legales.\n\n📌 *Datos preliminares:*\n• Antigüedad: 3 años\n• Contrato: Sí\n• IMSS: Sí\n• Tiempo desde el despido: 2 semanas\n\n⚖️ Te recomiendo agendar la consulta inicial lo antes posible. Tenemos disponibilidad:\n\n• Mañana jueves — 11:00 AM o 4:00 PM\n• Viernes — 10:00 AM\n\n¿Cuál horario te conviene? Necesito tu nombre completo para la cita.',
      },
    ],
    dataToCollect: [
      'Nombre del cliente',
      'Teléfono de contacto',
      'Tipo de servicio requerido',
      'Descripción breve del caso o proyecto',
      'Información preliminar relevante',
      'Fecha preferida para consulta',
      'Correo electrónico',
      'Cómo se enteró del despacho',
      'Urgencia del asunto',
    ],
  },
};

// -----------------------------------------------------------------------------
// HELPER: Obtener lista de demos disponibles
// -----------------------------------------------------------------------------

export function getAvailableDemos(): Array<{ id: string; name: string; emoji: string }> {
  return Object.entries(BUSINESS_DEMOS).map(([id, demo]) => ({
    id,
    name: demo.name,
    emoji: demo.emoji,
  }));
}

// -----------------------------------------------------------------------------
// HELPER: Obtener demo por ID
// -----------------------------------------------------------------------------

export function getDemoById(id: string): BusinessDemo | undefined {
  return BUSINESS_DEMOS[id];
}

// -----------------------------------------------------------------------------
// HELPER: Formatear demo para WhatsApp
// -----------------------------------------------------------------------------

export function formatDemoForWhatsApp(demo: BusinessDemo): string {
  let text = `${demo.emoji} *${demo.name}*\n\n`;
  text += `${demo.description}\n\n`;
  text += `📌 *¿Qué puede hacer el chatbot?*\n\n`;

  demo.capabilities.forEach((cap, i) => {
    text += `${i + 1}️⃣ ${cap}\n`;
  });

  text += `\n📋 *Datos que recopila automáticamente:*\n`;
  demo.dataToCollect.forEach((data) => {
    text += `• ${data}\n`;
  });

  text += `\n💬 ¿Te gustaría ver un ejemplo de conversación o saber cómo se aplicaría a tu negocio?`;

  return text;
}

// -----------------------------------------------------------------------------
// HELPER: Formatear conversación de ejemplo para WhatsApp
// -----------------------------------------------------------------------------

export function formatConversationForWhatsApp(
  conversation: Array<{ role: 'client' | 'bot'; message: string }>
): string {
  let text = '💬 *Ejemplo de conversación:*\n\n';

  conversation.forEach((msg) => {
    if (msg.role === 'client') {
      text += `👤 *Cliente:* ${msg.message}\n\n`;
    } else {
      text += `🤖 *Chatbot:* ${msg.message}\n\n`;
    }
    text += '---\n\n';
  });

  return text;
}
