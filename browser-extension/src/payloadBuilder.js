/**
 * PayloadBuilder - Crea y valida el JSON estructurado a enviar a la API
 * adaptando el formato al proveedor seleccionado.
 */
export function buildPayload({ rawContext, userPrompt, settings }) {
  const { provider, maxTextLength, includeLinks, includeSelection } = settings;

  // 1. Limitar el texto principal
  let text = rawContext.text || '';
  if (text.length > maxTextLength) {
    text = text.substring(0, maxTextLength) + '\n\n[... TEXTO TRUNCADO POR LÍMITE DE CONFIGURACIÓN ...]';
  }

  // 2. Filtrar campos según configuración
  const selection = includeSelection ? (rawContext.selection || '') : '';
  const links = includeLinks ? (rawContext.links || []) : [];

  // Si el proveedor es Ollama, creamos el formato de prompt de texto plano para LLM
  if (provider === 'ollama') {
    let promptContent = `[CONTEXTO DE LA PÁGINA WEB]\n`;
    promptContent += `URL: ${rawContext.url || 'Desconocida'}\n`;
    promptContent += `Título: ${rawContext.title || 'Sin Título'}\n`;
    
    if (selection) {
      promptContent += `Texto seleccionado por el usuario:\n"""\n${selection}\n"""\n`;
    }
    
    if (links.length > 0) {
      promptContent += `Enlaces importantes:\n`;
      links.forEach(l => {
        promptContent += `- ${l.text}: ${l.href}\n`;
      });
    }

    promptContent += `\nContenido de la página (texto visible):\n"""\n${text}\n"""\n\n`;
    promptContent += `[PREGUNTA / INSTRUCCIÓN DEL USUARIO]\n`;
    promptContent += userPrompt ? userPrompt : 'Analiza esta página y haz un resumen.';

    return {
      model: settings.ollamaModel || 'llama3',
      prompt: promptContent,
      stream: false
    };
  }

  // Si es Custom, Hermes o Antigravity, enviamos el JSON estructurado estándar
  return {
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
}
