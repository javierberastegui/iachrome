# Log backend_modulos - system_events

## Uso del archivo

Historial operativo de la capa central de eventos estructurados de IAChrome.

## Entradas

### 2026-06-06 - Alta documental del dominio

- Objetivo: evitar avisos sueltos en UI, content scripts o conectores.
- Decisiones:
  - primero evento estructurado.
  - después reglas centrales deciden log, resumen o notificación.
- Siguiente paso:
  - crear módulo `events` con tipos estables y dispatcher mínimo.

### 2026-06-06 - Implementación del Núcleo de Eventos y Logger v0.1.0

- Contexto: Desarrollo de la capa de eventos transversales del sistema para trazar las operaciones.
- Objetivo: Diseñar e implementar el bus de eventos y el logger estructurado.
- Decisiones:
  - Se creó `src/eventBus.js` que implementa un patrón Pub/Sub genérico que permite la comunicación desacoplada.
  - Se creó `src/logger.js` el cual se suscribe de forma global a todos los eventos y los registra en la consola del navegador estructurados por severidad e identificados por un prefijo `[Clawky]`.
  - Se definieron los eventos principales de la fase: `page_context_collected`, `context_send_started`, `context_send_success`, `context_send_error`, y `settings_updated`.
- Siguiente paso:
  - Extender el event bus para permitir la persistencia opcional de logs históricos locales.
