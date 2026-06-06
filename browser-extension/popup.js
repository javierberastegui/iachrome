import { eventBus } from './src/eventBus.js';
import { logger } from './src/logger.js';
import { getSettings } from './src/config.js';
import { buildPayload } from './src/payloadBuilder.js';
import { sendContextToApi } from './src/apiClient.js';

// Estado local de la aplicación
let extractedContext = null;

// Elementos del DOM
const btnAnalyze = document.getElementById('btn-analyze');
const btnSend = document.getElementById('btn-send');
const btnSettings = document.getElementById('btn-settings');
const txtUserPrompt = document.getElementById('user-prompt');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const responseContainer = document.getElementById('response-container');
const previewPanel = document.getElementById('preview-panel');
const previewTitle = document.getElementById('preview-title');
const previewUrl = document.getElementById('preview-url');
const previewSelection = document.getElementById('preview-selection');
const previewChars = document.getElementById('preview-chars');

// Suscripción al EventBus para gestionar de forma centralizada la UI de estado
eventBus.on('page_context_collected', (event) => {
  updateStatus('success', 'Página analizada con éxito');
  
  const ctx = event.payload;
  previewTitle.textContent = ctx.title || '(Sin título)';
  previewUrl.textContent = ctx.url || '(Sin URL)';
  previewSelection.textContent = ctx.selection ? `"${ctx.selection.substring(0, 60)}..."` : '(Ninguna)';
  previewChars.textContent = ctx.text ? ctx.text.length : 0;
  
  previewPanel.classList.remove('hidden');
  btnSend.disabled = false;
});

eventBus.on('context_send_started', () => {
  updateStatus('sending', 'Enviando a la IA...');
  responseContainer.className = 'response-content';
  responseContainer.textContent = 'Procesando consulta...';
});

eventBus.on('context_send_success', () => {
  updateStatus('success', 'Completado');
});

eventBus.on('context_send_error', (event) => {
  updateStatus('error', 'Error en el proceso');
  responseContainer.className = 'response-content error-text';
  responseContainer.textContent = event.payload.error || 'Ocurrió un error inesperado al enviar.';
});

/**
 * Actualiza el indicador de estado en la UI.
 * @param {string} state - 'idle', 'loading', 'sending', 'success', 'error'
 * @param {string} text - Mensaje a mostrar
 */
function updateStatus(state, text) {
  statusDot.className = 'status-dot';
  statusDot.classList.add(state);
  statusText.textContent = `Estado: ${text}`;
}

// Inicializar popup
async function init() {
  updateStatus('idle', 'Listo');
  
  // Abrir página de opciones
  btnSettings.addEventListener('click', (e) => {
    e.preventDefault();
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  });

  // Botón: Analizar Página
  btnAnalyze.addEventListener('click', async () => {
    updateStatus('loading', 'Leyendo página...');
    previewPanel.classList.add('hidden');
    btnSend.disabled = true;
    extractedContext = null;

    try {
      // Obtener pestaña activa
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) {
        throw new Error('No se detectó ninguna pestaña activa.');
      }

      // Evitar inyectar en páginas especiales del navegador (chrome://, edge://, etc.)
      if (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('about:')) {
        throw new Error('No se puede analizar páginas internas del navegador por motivos de seguridad.');
      }

      // Inyectar el content script
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ['contentScript.js']
        },
        (results) => {
          if (chrome.runtime.lastError) {
            const err = chrome.runtime.lastError.message;
            eventBus.emit('context_send_error', { error: `Error de inyección: ${err}` });
            return;
          }

          if (results && results[0] && results[0].result) {
            extractedContext = results[0].result;
            eventBus.emit('page_context_collected', extractedContext);
          } else {
            eventBus.emit('context_send_error', { error: 'No se recibieron datos del content script.' });
          }
        }
      );
    } catch (error) {
      eventBus.emit('context_send_error', { error: error.message });
    }
  });

  // Botón: Enviar a IA
  btnSend.addEventListener('click', async () => {
    if (!extractedContext) {
      updateStatus('error', 'Debes analizar la página primero');
      return;
    }

    try {
      const settings = await getSettings();
      const userPrompt = txtUserPrompt.value.trim();

      // Construir el payload aplicando filtros de configuración
      const payload = buildPayload({
        rawContext: extractedContext,
        userPrompt,
        settings
      });

      // Enviar a la API local/proveedor
      const responseText = await sendContextToApi(settings, payload);

      // Mostrar respuesta de forma segura
      responseContainer.className = 'response-content';
      responseContainer.textContent = responseText;

    } catch (error) {
      // El error ya es manejado y emitido por el apiClient, por lo que actualiza la UI automáticamente a través del EventBus.
    }
  });
}

// Ejecutar inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', init);
