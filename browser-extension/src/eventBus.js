/**
 * EventBus - Capa central de comunicación por eventos estructurados.
 */
class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  /**
   * Suscribe un callback a un tipo de evento.
   * @param {string} eventType 
   * @param {Function} callback 
   */
  on(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
  }

  /**
   * Elimina una suscripción.
   * @param {string} eventType 
   * @param {Function} callback 
   */
  off(eventType, callback) {
    if (!this.listeners.has(eventType)) return;
    const list = this.listeners.get(eventType);
    const index = list.indexOf(callback);
    if (index !== -1) {
      list.splice(index, 1);
    }
  }

  /**
   * Emite un evento estructurado.
   * @param {string} eventType 
   * @param {Object} data 
   */
  emit(eventType, data = {}) {
    const event = {
      type: eventType,
      timestamp: new Date().toISOString(),
      payload: data
    };

    if (this.listeners.has(eventType)) {
      this.listeners.get(eventType).forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          console.error(`Error procesando evento ${eventType}:`, error);
        }
      });
    }

    // Suscriptor global (opcional para depuración o auditoría)
    if (this.listeners.has('*')) {
      this.listeners.get('*').forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          console.error(`Error en suscriptor global de eventos:`, error);
        }
      });
    }
  }
}

export const eventBus = new EventBus();
