import { eventBus } from './eventBus.js';

/**
 * Envia el payload estructurado a la API del usuario.
 * @param {string} endpoint 
 * @param {Object} payload 
 * @returns {Promise<string>} La respuesta en texto devuelta por la API.
 */
export async function sendContextToApi(endpoint, payload) {
  if (!endpoint || endpoint.trim() === '') {
    const errorMsg = 'El endpoint de la API está vacío. Configúralo en la página de opciones.';
    eventBus.emit('context_send_error', { error: errorMsg });
    throw new Error(errorMsg);
  }

  eventBus.emit('context_send_started', { endpoint, payloadSize: JSON.stringify(payload).length });

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
      throw new Error(`Error de servidor: Código de estado ${response.status} (${response.statusText})`);
    }

    const responseText = await response.text();
    eventBus.emit('context_send_success', { status: response.status });
    return responseText;
  } catch (error) {
    clearTimeout(timeoutId);
    let errorMessage = error.message;
    if (error.name === 'AbortError') {
      errorMessage = 'La solicitud expiró (Timeout superado tras 8 segundos). ¿Está encendido el servidor local?';
    } else if (error.message.includes('Failed to fetch')) {
      errorMessage = `No se pudo conectar a la API local en ${endpoint}. Asegúrate de que el servidor está corriendo y de que tiene soporte para CORS habilitado.`;
    }
    
    eventBus.emit('context_send_error', { error: errorMessage });
    throw new Error(errorMessage);
  }
}
