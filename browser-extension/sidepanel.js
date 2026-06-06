import { eventBus } from './src/eventBus.js';
import { logger } from './src/logger.js';
import { getSettings, saveSettings } from './src/config.js';
import { buildPayload } from './src/payloadBuilder.js';
import { sendContextToApi } from './src/apiClient.js';

// Estado local de la aplicación
let extractedContext = null;

// Elementos de la Vista de Chat
const viewChat = document.getElementById('view-chat');
const viewSettings = document.getElementById('view-settings');
const btnToggleSettings = document.getElementById('btn-toggle-settings');
const btnBackToChat = document.getElementById('btn-back-to-chat');

const btnAnalyze = document.getElementById('btn-analyze');
const btnSend = document.getElementById('btn-send');
const txtUserPrompt = document.getElementById('user-prompt');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const responseContainer = document.getElementById('response-container');

// Elementos del panel de previsualización
const previewPanel = document.getElementById('preview-panel');
const previewTitle = document.getElementById('preview-title');
const previewUrl = document.getElementById('preview-url');
const previewSelection = document.getElementById('preview-selection');
const previewChars = document.getElementById('preview-chars');

// Elementos del Formulario de Opciones
const settingsForm = document.getElementById('settings-form');
const selectProvider = document.getElementById('provider');
const inputEndpoint = document.getElementById('endpoint');
const inputMaxTextLength = document.getElementById('max-text-length');
const checkboxIncludeLinks = document.getElementById('include-links');
const checkboxIncludeSelection = document.getElementById('include-selection');

const fieldsCustom = document.getElementById('fields-custom');
const fieldsOllama = document.getElementById('fields-ollama');
const fieldsHermes = document.getElementById('fields-hermes');
const fieldsAntigravity = document.getElementById('fields-antigravity');

const inputOllamaUrl = document.getElementById('ollama-url');
const inputOllamaModel = document.getElementById('ollama-model');
const inputHermesUrl = document.getElementById('hermes-url');
const inputAntigravityUrl = document.getElementById('antigravity-url');

const saveStatusText = document.getElementById('save-status');

// === EVENTOS DEL EVENTBUS PARA ACTUALIZAR LA INTERFAZ ===
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
 */
function updateStatus(state, text) {
  statusDot.className = 'status-dot';
  statusDot.classList.add(state);
  statusText.textContent = `Estado: ${text}`;
}

// === ALTERNANCIA DE VISTAS (PANELES) ===
function showSettingsPane() {
  loadConfigIntoForm();
  viewChat.classList.remove('active');
  viewSettings.classList.add('active');
}

function showChatPane() {
  viewSettings.classList.remove('active');
  viewChat.classList.add('active');
}

// === LÓGICA DE CONFIGURACIÓN ===
function updateFieldsVisibility() {
  const provider = selectProvider.value;
  
  fieldsCustom.classList.add('hidden');
  fieldsOllama.classList.add('hidden');
  fieldsHermes.classList.add('hidden');
  fieldsAntigravity.classList.add('hidden');

  if (provider === 'custom') {
    fieldsCustom.classList.remove('hidden');
  } else if (provider === 'ollama') {
    fieldsOllama.classList.remove('hidden');
  } else if (provider === 'hermes') {
    fieldsHermes.classList.remove('hidden');
  } else if (provider === 'antigravity') {
    fieldsAntigravity.classList.remove('hidden');
  }
}

async function loadConfigIntoForm() {
  const settings = await getSettings();
  
  selectProvider.value = settings.provider || 'custom';
  inputEndpoint.value = settings.endpoint;
  inputMaxTextLength.value = settings.maxTextLength;
  checkboxIncludeLinks.checked = settings.includeLinks;
  checkboxIncludeSelection.checked = settings.includeSelection;

  inputOllamaUrl.value = settings.ollamaUrl || 'http://127.0.0.1:11434/api/generate';
  inputOllamaModel.value = settings.ollamaModel || 'llama3';
  inputHermesUrl.value = settings.hermesUrl || 'http://127.0.0.1:18789/browser/context';
  inputAntigravityUrl.value = settings.antigravityUrl || 'http://127.0.0.1:18789/browser/context';

  updateFieldsVisibility();
}

async function handleSettingsSubmit(e) {
  e.preventDefault();

  const newSettings = {
    provider: selectProvider.value,
    endpoint: inputEndpoint.value.trim(),
    maxTextLength: parseInt(inputMaxTextLength.value, 10),
    includeLinks: checkboxIncludeLinks.checked,
    includeSelection: checkboxIncludeSelection.checked,
    ollamaUrl: inputOllamaUrl.value.trim(),
    ollamaModel: inputOllamaModel.value.trim(),
    hermesUrl: inputHermesUrl.value.trim(),
    antigravityUrl: inputAntigravityUrl.value.trim()
  };

  await saveSettings(newSettings);

  saveStatusText.textContent = '✓ Guardado';
  saveStatusText.classList.add('show');
  
  setTimeout(() => {
    saveStatusText.classList.remove('show');
    showChatPane(); // Vuelve al chat tras guardar
  }, 1000);
}

// === INICIALIZACIÓN Y BINDING ===
async function init() {
  updateStatus('idle', 'Listo');

  // Eventos de Navegación entre paneles
  btnToggleSettings.addEventListener('click', showSettingsPane);
  btnBackToChat.addEventListener('click', showChatPane);
  selectProvider.addEventListener('change', updateFieldsVisibility);
  settingsForm.addEventListener('submit', handleSettingsSubmit);

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
        throw new Error('No se pudo encontrar la pestaña activa.');
      }

      // Evitar inyectar en páginas internas
      if (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('about:')) {
        throw new Error('Las páginas internas del navegador no permiten análisis de seguridad.');
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
            eventBus.emit('context_send_error', { error: `Inyección fallida: ${err}` });
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

      const payload = buildPayload({
        rawContext: extractedContext,
        userPrompt,
        settings
      });

      const responseText = await sendContextToApi(settings, payload);

      responseContainer.className = 'response-content';
      responseContainer.textContent = responseText;

    } catch (error) {
      // Los errores ya son interceptados por el apiClient y emitidos al EventBus, actualizando la UI de forma reactiva.
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
