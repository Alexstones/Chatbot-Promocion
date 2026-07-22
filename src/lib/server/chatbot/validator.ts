/**
 * Validate and sanitize AI-generated responses before sending to user
 */
export function validateResponse(response: string): string {
  let validated = response;

  // Remove any markdown that WhatsApp doesn't support
  validated = cleanForWhatsApp(validated);

  // Check for invented prices and replace with safe alternative
  validated = sanitizePrices(validated);

  // Check response length - WhatsApp max is 4096 chars
  if (validated.length > 4000) {
    validated = validated.substring(0, 3950) + '\n\n...¿Te gustaría que continúe con más detalles?';
  }

  return validated;
}

/**
 * Clean markdown for WhatsApp compatibility
 * WhatsApp supports: *bold*, _italic_, ~strikethrough~, ```monospace```
 * Does NOT support: ## headers, [links](url), ![images], etc.
 */
function cleanForWhatsApp(text: string): string {
  let cleaned = text;

  // Convert markdown headers to bold
  cleaned = cleaned.replace(/^#{1,6}\s+(.+)$/gm, '*$1*');

  // Convert markdown links [text](url) to just text
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Convert markdown images to nothing
  cleaned = cleaned.replace(/!\[([^\]]*?)\]\([^)]+\)/g, '');

  // Convert --- or === dividers to simple line
  cleaned = cleaned.replace(/^[-=]{3,}$/gm, '───────────');

  // Convert markdown bullet points
  cleaned = cleaned.replace(/^\s*[-*+]\s+/gm, '• ');

  // Convert numbered lists that use markdown format
  cleaned = cleaned.replace(/^\s*(\d+)\.\s+/gm, '$1. ');

  // Remove double asterisks (markdown bold) and replace with single (WhatsApp bold)
  cleaned = cleaned.replace(/\*\*(.+?)\*\*/g, '*$1*');

  // Remove excessive newlines (max 2 consecutive)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

/**
 * Check for and sanitize any price mentions that might be AI-generated
 */
function sanitizePrices(text: string): string {
  // Patterns that look like specific prices
  const pricePatterns = [
    /\$\s*\d+[,.]?\d*/g,
    /\d+[,.]?\d*\s*(pesos|d[oó]lares|mxn|usd|euros?)/gi,
    /precio\s*(de|es|ser[ií]a|:)\s*\$?\s*\d+/gi,
    /cuesta\s*\$?\s*\d+/gi,
    /cobr(amos|an)\s*\$?\s*\d+/gi,
    /inversi[oó]n\s*(de|es|:)\s*\$?\s*\d+/gi,
    /mensualidad\s*(de|es|:)\s*\$?\s*\d+/gi,
    /descuento\s*(del?|de)\s*\d+\s*%/gi,
    /\d+\s*%\s*(de\s*)?descuento/gi,
    /promoci[oó]n.*\$\s*\d+/gi,
    /oferta.*\$\s*\d+/gi
  ];

  let hasPrices = false;
  for (const pattern of pricePatterns) {
    if (pattern.test(text)) {
      hasPrices = true;
      break;
    }
  }

  if (hasPrices) {
    // Don't remove the prices, but add a disclaimer
    const disclaimer = '\n\n_Los precios y condiciones específicas serán confirmados por un asesor según las necesidades de tu proyecto._';
    if (!text.includes('confirmados por un asesor')) {
      text += disclaimer;
    }
  }

  return text;
}

/**
 * Ensure the response doesn't make promises about features not in the knowledge base
 */
export function addSafetyDisclaimer(text: string, topic: string): string {
  const sensibleTopics = ['precio', 'costo', 'garantía', 'tiempo', 'plazo', 'descuento'];
  const needsDisclaimer = sensibleTopics.some(t => topic.toLowerCase().includes(t));
  
  if (needsDisclaimer && !text.includes('asesor confirmará')) {
    return text + '\n\n_Un asesor confirmará los detalles específicos para tu caso._';
  }
  
  return text;
}
