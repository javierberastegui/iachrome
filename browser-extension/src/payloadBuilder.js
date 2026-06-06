/**
 * PayloadBuilder - Crea y valida el JSON estructurado a enviar a la API.
 */
export function buildPayload({ rawContext, userPrompt, settings }) {
  const { maxTextLength, includeLinks, includeSelection } = settings;

  // 1. Procesar texto principal según límites
  let text = rawContext.text || '';
  if (text.length > maxTextLength) {
    text = text.substring(0, maxTextLength) + '\n\n[... TEXTO TRUNCADO POR LÍMITE DE CONFIGURACIÓN ...]';
  }

  // 2. Procesar selección según configuración
  const selection = includeSelection ? (rawContext.selection || '') : '';

  // 3. Procesar links según configuración
  const links = includeLinks ? (rawContext.links || []) : [];

  // 4. Armar el objeto estructurado
  const payload = {
    source: 'browser_extension',
    event_type: 'browser_context_requested',
    timestamp: new Date().toISOString(),
    page: {
      url: rawContext.url || '',
      title: rawContext.title || '',
      selection: selection,
      text: text,
      headings: {
        h1: rawContext.headings?.h1 || [],
        h2: rawContext.headings?.h2 || [],
        h3: rawContext.headings?.h3 || []
      },
      links: links
    },
    user_prompt: userPrompt || '',
    extension: {
      name: 'Clawky Browser Copilot',
      version: '0.1.0'
    }
  };

  return payload;
}
