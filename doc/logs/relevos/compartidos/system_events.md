# Relevo - system_events

## Estado actual

Fase v0.1.0 completada. La infraestructura de mensajería y logging por consola para eventos estructurados está lista.

## Hecho

- Creado `src/eventBus.js` que ofrece publicación y suscripción a eventos.
- Creado `src/logger.js` para capturar todos los eventos y registrarlos por consola con prefijos limpios y el nivel de severidad correspondiente.
- Se enlazaron las acciones del popup y del cliente HTTP con eventos específicos (`page_context_collected`, `context_send_started`, `context_send_success`, `context_send_error`, y `settings_updated`).

## Pendiente

- Crear un sumidero persistente (ej. escribir logs en storage o enviarlos a un endpoint de telemetría/auditoría local).

## Siguiente micro-paso recomendado

Observar la consola del popup de la extensión para validar que los flujos de eventos imprimen los logs estructurados correspondientes a cada acción.
