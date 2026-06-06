# Relevo - agent_connectors

## Estado actual

Fase v0.1.0 completada. El conector API y formateador de peticiones se han desarrollado por completo.

## Hecho

- Definido el formato de payload JSON estructurado solicitado por el usuario.
- Creado `src/apiClient.js` con soporte para peticiones POST asíncronas, validación de endpoint y un control de timeout de 8 segundos con `AbortController`.
- El conector envía el payload de manera desacoplada e interactúa mediante eventos globales.

## Pendiente

- Crear conectores específicos adicionales (por ejemplo, WebSockets o gRPC) si se requiere en fases futuras.

## Siguiente micro-paso recomendado

Levantar un servidor de pruebas o mock local que escuche en el puerto `18789` para procesar y responder las peticiones del cliente.
