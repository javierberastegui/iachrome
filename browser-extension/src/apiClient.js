import { eventBus } from './eventBus.js';

/**
 * Determina el endpoint de destino basándose en el proveedor seleccionado.
 * @param {Object} settings 
 * @returns {string} URL del endpoint
 */
function getEndpointForProvider(settings) {
  const { provider } = settings;
  switch (provider) {
    case 'ollama':
      return settings.ollamaUrl;
    case 'hermes':
      return settings.hermesUrl;
    case 'antigravity':
      return settings.antigravityUrl;
    case 'custom':
    default:
      return settings.endpoint;
  }
}

/**
 * Envía el payload estructurado o el prompt de texto al proveedor de IA configurado.
 * @param {Object} settings - Configuraciones de la extensión
 * @param {Object} payload - Payload formateado
 * @returns {Promise<string>} La respuesta en texto devuelta por la API.
 */
export async function sendContextToApi(settings, payload) {
  const endpoint = getEndpointForProvider(settings);

  if (!endpoint || endpoint.trim() === '') {
    const errorMsg = `El endpoint para el proveedor '${settings.provider || 'custom'}' está vacío. Configúralo en la página de opciones.`;
    eventBus.emit('context_send_error', { error: errorMsg });
    throw new Error(errorMsg);
  }

  eventBus.emit('context_send_started', { endpoint, provider: settings.provider, payloadSize: JSON.stringify(payload).length });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos de timeout

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error del servidor (${settings.provider}): Código de estado ${response.status} (${response.statusText})`);
    }

    const responseText = await response.text();
    eventBus.emit('context_send_success', { status: response.status });

    // Si el proveedor es Ollama, intentamos parsear la propiedad "response" del JSON
    if (settings.provider === 'ollama') {
      try {
        const jsonResponse = JSON.parse(responseText);
        if (jsonResponse && jsonResponse.response !== undefined) {
          return jsonResponse.response;
        }
      } catch (e) {
        // Si no se puede parsear como JSON, retornamos el texto bruto
      }
    }

    return responseText;
  } catch (error) {
    clearTimeout(timeoutId);
    let errorMessage = error.message;
    if (error.name === 'AbortError') {
      errorMessage = 'La solicitud expiró (Timeout superado tras 8 segundos). ¿Está encendido tu servidor de IA local?';
    } else if (error.message.includes('Failed to fetch')) {
      errorMessage = `No se pudo conectar al servidor de IA en ${endpoint}. Asegúrate de que el servicio está activo y admite peticiones CORS.`;
    }
    
    eventBus.emit('context_send_error', { error: errorMessage });
    throw new Error(errorMessage);
  }
}
