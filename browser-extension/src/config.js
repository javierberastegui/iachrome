import { eventBus } from './eventBus.js';

export const DEFAULT_SETTINGS = {
  provider: 'custom', // 'custom', 'ollama', 'hermes', 'antigravity'
  endpoint: 'http://127.0.0.1:18789/browser/context',
  maxTextLength: 50000,
  includeLinks: true,
  includeSelection: true,
  ollamaUrl: 'http://127.0.0.1:11434/api/generate',
  ollamaModel: 'llama3',
  hermesUrl: 'http://127.0.0.1:18789/browser/context',
  antigravityUrl: 'http://127.0.0.1:18789/browser/context'
};

/**
 * Obtiene las configuraciones guardadas de chrome.storage.local.
 * Si no existen, retorna los valores por defecto.
 * @returns {Promise<typeof DEFAULT_SETTINGS>}
 */
export async function getSettings() {
  return new Promise((resolve) => {
    if (typeof chrome === 'undefined' || !chrome.storage || !chrome.storage.local) {
      // Fallback para desarrollo/testing fuera de la extensión
      resolve({ ...DEFAULT_SETTINGS });
      return;
    }
    chrome.storage.local.get(Object.keys(DEFAULT_SETTINGS), (items) => {
      const settings = {};
      for (const key in DEFAULT_SETTINGS) {
        settings[key] = items[key] !== undefined ? items[key] : DEFAULT_SETTINGS[key];
      }
      resolve(settings);
    });
  });
}

/**
 * Guarda las configuraciones en chrome.storage.local.
 * @param {Partial<typeof DEFAULT_SETTINGS>} newSettings 
 * @returns {Promise<void>}
 */
export async function saveSettings(newSettings) {
  return new Promise((resolve) => {
    if (typeof chrome === 'undefined' || !chrome.storage || !chrome.storage.local) {
      resolve();
      return;
    }
    chrome.storage.local.set(newSettings, () => {
      eventBus.emit('settings_updated', newSettings);
      resolve();
    });
  });
}
