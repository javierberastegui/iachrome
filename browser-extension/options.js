import { getSettings, saveSettings } from './src/config.js';

// Elementos del DOM
const settingsForm = document.getElementById('settings-form');
const inputEndpoint = document.getElementById('endpoint');
const inputMaxTextLength = document.getElementById('max-text-length');
const checkboxIncludeLinks = document.getElementById('include-links');
const checkboxIncludeSelection = document.getElementById('include-selection');
const saveStatusText = document.getElementById('save-status');

// Cargar configuraciones al iniciar la página
async function loadConfig() {
  const settings = await getSettings();
  
  inputEndpoint.value = settings.endpoint;
  inputMaxTextLength.value = settings.maxTextLength;
  checkboxIncludeLinks.checked = settings.includeLinks;
  checkboxIncludeSelection.checked = settings.includeSelection;
}

// Guardar configuraciones en el almacenamiento
async function handleFormSubmit(e) {
  e.preventDefault();

  const newSettings = {
    endpoint: inputEndpoint.value.trim(),
    maxTextLength: parseInt(inputMaxTextLength.value, 10),
    includeLinks: checkboxIncludeLinks.checked,
    includeSelection: checkboxIncludeSelection.checked
  };

  await saveSettings(newSettings);

  // Mostrar mensaje de éxito temporal
  saveStatusText.textContent = '✓ Configuración guardada con éxito';
  saveStatusText.classList.add('show');
  
  setTimeout(() => {
    saveStatusText.classList.remove('show');
  }, 3000);
}

// Escuchar eventos
document.addEventListener('DOMContentLoaded', loadConfig);
settingsForm.addEventListener('submit', handleFormSubmit);
