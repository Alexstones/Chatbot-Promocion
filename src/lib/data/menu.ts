// =============================================================================
// MENUS - Menús interactivos para WhatsApp
// =============================================================================

// -----------------------------------------------------------------------------
// Interfaz de menú de WhatsApp
// -----------------------------------------------------------------------------

export interface WhatsAppMenu {
  type: 'buttons' | 'list';
  headerText?: string;
  bodyText: string;
  footerText?: string;
  buttonText?: string; // solo para type 'list'
  buttons?: Array<{ id: string; title: string }>; // máximo 3 para type 'buttons'
  sections?: Array<{
    title: string;
    rows: Array<{ id: string; title: string; description?: string }>;
  }>;
}

// -----------------------------------------------------------------------------
// 1. MENÚ PRINCIPAL
// -----------------------------------------------------------------------------

export const MAIN_MENU: WhatsAppMenu = {
  type: 'list',
  headerText: '🤖 Menú Principal',
  bodyText:
    'Soy un asesor inteligente especializado en chatbots para empresas. Selecciona una opción para conocer más:',
  footerText: 'Chatbot Promoción • Automatiza tu negocio',
  buttonText: '📋 Ver opciones',
  sections: [
    {
      title: 'Información general',
      rows: [
        {
          id: 'menu_what_is',
          title: '🤖 ¿Qué es un chatbot?',
          description: 'Descubre qué es y cómo funciona',
        },
        {
          id: 'menu_functions',
          title: '⚙️ ¿Qué puede hacer?',
          description: 'Funciones y capacidades del chatbot',
        },
        {
          id: 'menu_ai',
          title: '🧠 Inteligencia artificial',
          description: 'Cómo funciona la IA en el chatbot',
        },
        {
          id: 'menu_integrations',
          title: '🔗 Integraciones',
          description: 'Con qué sistemas se puede conectar',
        },
      ],
    },
    {
      title: 'Demostraciones',
      rows: [
        {
          id: 'menu_gps_demo',
          title: '📡 Demo: Empresa de GPS',
          description: 'Prueba el chatbot como cliente de GPS',
        },
        {
          id: 'menu_business_types',
          title: '🏢 Tipos de negocio',
          description: 'Ejemplos para diferentes industrias',
        },
      ],
    },
    {
      title: 'Comercial',
      rows: [
        {
          id: 'menu_whatsapp',
          title: '📱 WhatsApp Business',
          description: 'Integración con WhatsApp API',
        },
        {
          id: 'menu_quote',
          title: '💰 Solicitar cotización',
          description: 'Quiero un chatbot para mi negocio',
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// 2. MENÚ DE DEMO GPS
// -----------------------------------------------------------------------------

export const GPS_DEMO_MENU: WhatsAppMenu = {
  type: 'list',
  headerText: '📡 Demo GPS y Rastreo Satelital',
  bodyText:
    'Explora la demostración del chatbot para una empresa de GPS y rastreo satelital. Elige qué te gustaría probar:',
  footerText: 'Escribe "menú" para volver al menú principal',
  buttonText: '📡 Opciones GPS',
  sections: [
    {
      title: 'Funciones de la demo',
      rows: [
        {
          id: 'gps_services',
          title: '📡 Ver servicios de GPS',
          description: 'Conoce todos los servicios disponibles',
        },
        {
          id: 'gps_questions',
          title: '❓ Preguntas frecuentes',
          description: 'Preguntas que hacen los clientes de GPS',
        },
        {
          id: 'gps_recommend',
          title: '🎯 Recomendar un plan',
          description: 'El bot te recomienda el plan ideal',
        },
        {
          id: 'gps_platform',
          title: '🖥️ Funciones de la plataforma',
          description: 'Ve qué puede hacer la plataforma de rastreo',
        },
        {
          id: 'gps_conversation',
          title: '💬 Ver ejemplo de conversación',
          description: 'Cómo sería una conversación real',
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// 3. MENÚ DE FUNCIONES
// -----------------------------------------------------------------------------

export const FUNCTIONS_MENU: WhatsAppMenu = {
  type: 'list',
  headerText: '⚙️ Funciones del Chatbot',
  bodyText:
    'Un chatbot con IA puede realizar muchas funciones. Selecciona una categoría para ver los detalles:',
  footerText: 'Cada función se personaliza para tu negocio',
  buttonText: '⚙️ Ver funciones',
  sections: [
    {
      title: 'Categorías de funciones',
      rows: [
        {
          id: 'func_attention',
          title: '💬 Atención al cliente',
          description: 'Respuestas automáticas y soporte',
        },
        {
          id: 'func_sales',
          title: '💰 Ventas',
          description: 'Detección de interés y cierre de ventas',
        },
        {
          id: 'func_quotes',
          title: '📋 Cotizaciones',
          description: 'Generación automática de cotizaciones',
        },
        {
          id: 'func_appointments',
          title: '📅 Citas y reservaciones',
          description: 'Gestión de agenda automática',
        },
        {
          id: 'func_catalog',
          title: '📦 Catálogos',
          description: 'Productos y servicios interactivos',
        },
        {
          id: 'func_followup',
          title: '🔄 Seguimiento',
          description: 'Recontacto y recordatorios',
        },
        {
          id: 'func_support',
          title: '🔧 Soporte técnico',
          description: 'Atención técnica básica',
        },
        {
          id: 'func_admin',
          title: '📊 Administración',
          description: 'Reportes y gestión de datos',
        },
        {
          id: 'func_all',
          title: '📌 Ver todas las funciones',
          description: 'Resumen completo de capacidades',
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// 4. MENÚ DE TIPOS DE NEGOCIO
// -----------------------------------------------------------------------------

export const BUSINESS_TYPE_MENU: WhatsAppMenu = {
  type: 'list',
  headerText: '🏢 Tipos de Negocio',
  bodyText:
    'El chatbot se adapta a cualquier tipo de negocio. Selecciona una industria para ver cómo funcionaría:',
  footerText: 'Cada demo es personalizable para tu empresa',
  buttonText: '🏢 Ver negocios',
  sections: [
    {
      title: 'Salud',
      rows: [
        {
          id: 'biz_clinic',
          title: '🏥 Clínicas y consultorios',
          description: 'Citas médicas, pacientes, especialidades',
        },
        {
          id: 'biz_medical_equipment',
          title: '🩺 Equipos médicos',
          description: 'Venta de equipo por especialidad',
        },
      ],
    },
    {
      title: 'Comercio y servicios',
      rows: [
        {
          id: 'biz_real_estate',
          title: '🏠 Inmobiliarias',
          description: 'Compra, renta y visitas a propiedades',
        },
        {
          id: 'biz_restaurant',
          title: '🍽️ Restaurantes',
          description: 'Menú, reservaciones y pedidos',
        },
        {
          id: 'biz_store',
          title: '🛍️ Tiendas',
          description: 'Productos, pedidos y envíos',
        },
        {
          id: 'biz_workshop',
          title: '🔧 Talleres mecánicos',
          description: 'Diagnóstico, citas y presupuestos',
        },
      ],
    },
    {
      title: 'Educación y seguridad',
      rows: [
        {
          id: 'biz_school',
          title: '🎓 Escuelas y cursos',
          description: 'Programas, inscripciones y horarios',
        },
        {
          id: 'biz_security',
          title: '🔐 Empresas de seguridad',
          description: 'Cámaras, alarmas y monitoreo',
        },
      ],
    },
    {
      title: 'Profesional',
      rows: [
        {
          id: 'biz_professional',
          title: '💼 Servicios profesionales',
          description: 'Abogados, contadores, arquitectos',
        },
        {
          id: 'biz_other',
          title: '🏗️ Otro tipo de negocio',
          description: 'Cuéntanos tu giro, lo adaptamos',
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// 5. CAMPOS PARA DATOS DE COTIZACIÓN
// -----------------------------------------------------------------------------

export interface QuoteField {
  id: string;
  label: string;
  emoji: string;
  required: boolean;
  description: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'number';
  options?: string[];
}

export const QUOTE_DATA_FIELDS: QuoteField[] = [
  {
    id: 'nombre',
    label: 'Nombre completo',
    emoji: '👤',
    required: true,
    description: 'Tu nombre o el del responsable del proyecto',
    type: 'text',
  },
  {
    id: 'empresa',
    label: 'Nombre de la empresa',
    emoji: '🏢',
    required: true,
    description: 'Nombre comercial o razón social',
    type: 'text',
  },
  {
    id: 'giro',
    label: 'Giro o industria',
    emoji: '🏭',
    required: true,
    description: '¿A qué se dedica tu empresa?',
    type: 'text',
  },
  {
    id: 'funciones',
    label: 'Funciones de interés',
    emoji: '⚙️',
    required: true,
    description: '¿Qué necesitas que haga el chatbot?',
    type: 'select',
    options: [
      'Atención al cliente',
      'Ventas y recomendaciones',
      'Cotizaciones automáticas',
      'Citas y reservaciones',
      'Catálogo de productos',
      'Seguimiento de prospectos',
      'Soporte técnico',
      'Todo lo anterior',
    ],
  },
  {
    id: 'whatsapp_business',
    label: '¿Tienes WhatsApp Business?',
    emoji: '📱',
    required: false,
    description: '¿Ya cuentas con una cuenta de WhatsApp Business?',
    type: 'select',
    options: ['Sí', 'No', 'No sé qué es'],
  },
  {
    id: 'volumen_mensajes',
    label: 'Mensajes por día',
    emoji: '💬',
    required: false,
    description: '¿Cuántos mensajes recibes al día aproximadamente?',
    type: 'select',
    options: [
      'Menos de 10',
      '10 a 50',
      '50 a 100',
      '100 a 500',
      'Más de 500',
      'No estoy seguro',
    ],
  },
  {
    id: 'email',
    label: 'Correo electrónico',
    emoji: '📧',
    required: true,
    description: 'Para enviarte la propuesta y cotización',
    type: 'email',
  },
  {
    id: 'telefono',
    label: 'WhatsApp de contacto',
    emoji: '📞',
    required: true,
    description: 'Número donde podamos contactarte',
    type: 'phone',
  },
];

// -----------------------------------------------------------------------------
// 6. MENÚ DE OPCIONES DE CIERRE
// -----------------------------------------------------------------------------

export const CLOSE_OPTIONS_MENU: WhatsAppMenu = {
  type: 'buttons',
  headerText: '🚀 ¿Qué te gustaría hacer?',
  bodyText:
    'Elige cómo quieres continuar. Podemos prepararte una propuesta personalizada o agendar una sesión de demostración.',
  footerText: 'Sin compromiso',
  buttons: [
    {
      id: 'close_quote',
      title: '💰 Cotización',
    },
    {
      id: 'close_demo',
      title: '🎯 Demostración',
    },
    {
      id: 'close_advisor',
      title: '👤 Hablar con asesor',
    },
  ],
};

// -----------------------------------------------------------------------------
// MENÚ AUXILIAR: Confirmación rápida (Sí/No)
// -----------------------------------------------------------------------------

export const CONFIRM_MENU: WhatsAppMenu = {
  type: 'buttons',
  bodyText: '¿Te gustaría continuar?',
  buttons: [
    {
      id: 'confirm_yes',
      title: '✅ Sí',
    },
    {
      id: 'confirm_no',
      title: '❌ No, gracias',
    },
  ],
};

// -----------------------------------------------------------------------------
// MENÚ AUXILIAR: Volver al menú principal
// -----------------------------------------------------------------------------

export const BACK_TO_MENU: WhatsAppMenu = {
  type: 'buttons',
  bodyText: '¿Qué te gustaría hacer ahora?',
  buttons: [
    {
      id: 'back_main_menu',
      title: '📋 Menú principal',
    },
    {
      id: 'back_quote',
      title: '💰 Cotización',
    },
    {
      id: 'back_question',
      title: '❓ Otra pregunta',
    },
  ],
};

// -----------------------------------------------------------------------------
// HELPER: Formatear menú como texto plano para WhatsApp
// (Alternativa cuando no se puede usar interactive messages)
// -----------------------------------------------------------------------------

export function formatMenuAsText(menu: WhatsAppMenu): string {
  let text = '';

  if (menu.headerText) {
    text += `*${menu.headerText}*\n\n`;
  }

  text += `${menu.bodyText}\n\n`;

  if (menu.type === 'buttons' && menu.buttons) {
    menu.buttons.forEach((button, index) => {
      text += `${index + 1}️⃣ ${button.title}\n`;
    });
  }

  if (menu.type === 'list' && menu.sections) {
    menu.sections.forEach((section) => {
      text += `📌 *${section.title}*\n`;
      section.rows.forEach((row, index) => {
        text += `${index + 1}️⃣ ${row.title}`;
        if (row.description) {
          text += ` — ${row.description}`;
        }
        text += '\n';
      });
      text += '\n';
    });
  }

  if (menu.footerText) {
    text += `\n_${menu.footerText}_`;
  }

  return text;
}

// -----------------------------------------------------------------------------
// HELPER: Construir payload de mensaje interactivo de WhatsApp
// -----------------------------------------------------------------------------

export function buildInteractivePayload(
  menu: WhatsAppMenu,
  recipientPhone: string
): Record<string, unknown> {
  if (menu.type === 'buttons' && menu.buttons) {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipientPhone,
      type: 'interactive',
      interactive: {
        type: 'button',
        header: menu.headerText
          ? { type: 'text', text: menu.headerText }
          : undefined,
        body: { text: menu.bodyText },
        footer: menu.footerText ? { text: menu.footerText } : undefined,
        action: {
          buttons: menu.buttons.map((btn) => ({
            type: 'reply',
            reply: {
              id: btn.id,
              title: btn.title,
            },
          })),
        },
      },
    };
  }

  if (menu.type === 'list' && menu.sections) {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipientPhone,
      type: 'interactive',
      interactive: {
        type: 'list',
        header: menu.headerText
          ? { type: 'text', text: menu.headerText }
          : undefined,
        body: { text: menu.bodyText },
        footer: menu.footerText ? { text: menu.footerText } : undefined,
        action: {
          button: menu.buttonText ?? 'Ver opciones',
          sections: menu.sections.map((section) => ({
            title: section.title,
            rows: section.rows.map((row) => ({
              id: row.id,
              title: row.title,
              description: row.description,
            })),
          })),
        },
      },
    };
  }

  // Fallback: texto plano
  return {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: recipientPhone,
    type: 'text',
    text: { body: formatMenuAsText(menu) },
  };
}
