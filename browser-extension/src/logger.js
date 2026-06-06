import { eventBus } from './eventBus.js';

/**
 * Logger - Mapea eventos estructurados del EventBus a la consola del desarrollador.
 */
class Logger {
  constructor() {
    this.init();
  }

  init() {
    // Escuchamos todos los eventos registrados en el bus
    eventBus.on('*', (event) => {
      this.logEvent(event);
    });
  }

  /**
   * Determina la severidad e imprime el mensaje correspondiente.
   * @param {Object} event 
   */
  logEvent(event) {
    const { type, timestamp, payload } = event;
    let severity = 'info';
    let message = '';

    // Asignamos severidad según el tipo de evento
    switch (type) {
      case 'page_context_collected':
        severity = 'info';
        message = `Contexto de página extraído con éxito para la URL: ${payload.url || 'desconocida'}`;
        break;
      case 'context_send_started':
        severity = 'info';
        message = `Iniciando envío de contexto a: ${payload.endpoint}`;
        break;
      case 'context_send_success':
        severity = 'info';
        message = `Envío de contexto exitoso. Estado HTTP: ${payload.status}`;
        break;
      case 'context_send_error':
        severity = 'error';
        message = `Error al enviar el contexto: ${payload.error}`;
        break;
      case 'settings_updated':
        severity = 'info';
        message = `Configuración actualizada en almacenamiento local.`;
        break;
      default:
        severity = 'debug';
        message = `Evento no clasificado recibido: ${type}`;
    }

    const logPrefix = `[Clawky][${severity.toUpperCase()}][${timestamp}]`;

    switch (severity) {
      case 'critical':
      case 'error':
        console.error(logPrefix, message, payload);
        break;
      case 'warning':
        console.warn(logPrefix, message, payload);
        break;
      case 'info':
        console.info(logPrefix, message, payload);
        break;
      default:
        console.log(logPrefix, message, payload);
    }
  }
}

export const logger = new Logger();
export default logger;
