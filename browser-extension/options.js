import { getSettings, saveSettings } from './src/config.js';

// Elementos del DOM
const settingsForm = document.getElementById('settings-form');
const selectProvider = document.getElementById('provider');
const inputEndpoint = document.getElementById('endpoint');
const inputMaxTextLength = document.getElementById('max-text-length');
const checkboxIncludeLinks = document.getElementById('include-links');
const checkboxIncludeSelection = document.getElementById('include-selection');

// Contenedores de campos específicos
const fieldsCustom = document.getElementById('fields-custom');
const fieldsOllama = document.getElementById('fields-ollama');
const fieldsHermes = document.getElementById('fields-hermes');
const fieldsAntigravity = document.getElementById('fields-antigravity');

// Campos de Ollama
const inputOllamaUrl = document.getElementById('ollama-url');
const inputOllamaModel = document.getElementById('ollama-model');

// Campos de Hermes
const inputHermesUrl = document.getElementById('hermes-url');

// Campos de Antigravity
const inputAntigravityUrl = document.getElementById('antigravity-url');

const saveStatusText = document.getElementById('save-status');
const btnTestConnection = document.getElementById('btn-test-connection');
const testStatusText = document.getElementById('test-status');

// Actualizar la visibilidad de los paneles según el proveedor
function updateFieldsVisibility() {
  const provider = selectProvider.value;
  
  // Ocultar todos
  fieldsCustom.classList.add('hidden');
  fieldsOllama.classList.add('hidden');
  fieldsHermes.classList.add('hidden');
  fieldsAntigravity.classList.add('hidden');

  // Mostrar el seleccionado
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

// Cargar configuraciones al iniciar la página
async function loadConfig() {
  const settings = await getSettings();
  
  selectProvider.value = settings.provider || 'custom';
  inputEndpoint.value = settings.endpoint;
  inputMaxTextLength.value = settings.maxTextLength;
  checkboxIncludeLinks.checked = settings.includeLinks;
  checkboxIncludeSelection.checked = settings.includeSelection;

  // Cargar campos específicos
  inputOllamaUrl.value = settings.ollamaUrl || 'http://127.0.0.1:11434/api/generate';
  inputOllamaModel.value = settings.ollamaModel || 'llama3';
  inputHermesUrl.value = settings.hermesUrl || 'http://127.0.0.1:18789/browser/context';
  inputAntigravityUrl.value = settings.antigravityUrl || 'http://127.0.0.1:18789/browser/context';

  // Sincronizar visibilidad
  updateFieldsVisibility();
}

// Guardar configuraciones en el almacenamiento
async function handleFormSubmit(e) {
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

  // Mostrar mensaje de éxito temporal
  saveStatusText.textContent = '✓ Configuración guardada con éxito';
  saveStatusText.classList.add('show');
  
  setTimeout(() => {
    saveStatusText.classList.remove('show');
  }, 3000);
}

/**
 * Realiza una prueba de conexión rápida con el servidor de IA activo.
 */
async function testConnection() {
  const provider = selectProvider.value;
  let url = '';

  if (provider === 'custom') {
    url = inputEndpoint.value.trim();
  } else if (provider === 'ollama') {
    url = inputOllamaUrl.value.trim();
  } else if (provider === 'hermes') {
    url = inputHermesUrl.value.trim();
  } else if (provider === 'antigravity') {
    url = inputAntigravityUrl.value.trim();
  }

  if (!url) {
    testStatusText.className = 'test-status error';
    testStatusText.textContent = '✗ Error: La URL de conexión está vacía';
    return;
  }

  btnTestConnection.disabled = true;
  btnTestConnection.textContent = 'Probando...';
  testStatusText.className = 'test-status';
  testStatusText.textContent = 'Verificando servicio y CORS...';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 segundos de timeout

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test_connection: true }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    testStatusText.className = 'test-status success';
    testStatusText.textContent = `✓ Conexión establecida con éxito (HTTP ${response.status})`;
  } catch (error) {
    clearTimeout(timeoutId);
    testStatusText.className = 'test-status error';
    if (error.name === 'AbortError') {
      testStatusText.textContent = '✗ Error: Tiempo de espera agotado (4s)';
    } else {
      testStatusText.textContent = '✗ Error de conexión (Servidor inactivo o bloqueo CORS)';
    }
  } finally {
    btnTestConnection.disabled = false;
    btnTestConnection.textContent = 'Probar Conexión';
  }
}

// Escuchar eventos
document.addEventListener('DOMContentLoaded', loadConfig);
selectProvider.addEventListener('change', updateFieldsVisibility);
settingsForm.addEventListener('submit', handleFormSubmit);
btnTestConnection.addEventListener('click', testConnection);
