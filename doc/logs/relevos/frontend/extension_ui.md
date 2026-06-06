# Relevo - extension_ui

## Estado actual

Fase v0.1.0 completada. Interfaz gráfica funcional desarrollada para el popup y la página de opciones.

## Hecho

- Creado `manifest.json` para Manifest V3.
- Creada interfaz de popup (`popup.html`, `popup.css`, `popup.js`) con controles, estados y panel de respuesta.
- Creada interfaz de opciones (`options.html`, `options.css`, `options.js`) para modificar y persistir la configuración.
- Implementado estilo visual oscuro técnico premium utilizando una paleta basada en HSL, con bordes y botones pulidos y transiciones suaves.
- Añadidos controles dinámicos e interactivos en la página de opciones para seleccionar y configurar individualmente los proveedores (Custom, Ollama, Hermes, Antigravity).
- Creado el panel lateral (`sidepanel.html`, `sidepanel.js`, `sidepanel.css`) como interfaz principal de copiloto tipo panel lateral integrado.
- Implementado y replicado el botón "Probar Conexión" en el panel lateral y la página de opciones.
- Añadido soporte de permisos locales (`host_permissions`) en `manifest.json` para evitar bloqueos CORS.

## Pendiente

- Añadir un empaquetado/compilación automatizado en caso de migrar a TypeScript.

## Siguiente micro-paso recomendado

Cargar y probar la extensión localmente, levantando el mock server para verificar el botón de prueba de conexión en ambas interfaces.
