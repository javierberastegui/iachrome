# Relevo - extension_ui

## Estado actual

Fase v0.1.0 completada. Interfaz gráfica funcional desarrollada para el popup y la página de opciones.

## Hecho

- Creado `manifest.json` para Manifest V3.
- Creada interfaz de popup (`popup.html`, `popup.css`, `popup.js`) con controles, estados y panel de respuesta.
- Creada interfaz de opciones (`options.html`, `options.css`, `options.js`) para modificar y persistir la configuración.
- Implementado estilo visual oscuro técnico premium utilizando una paleta basada en HSL, con bordes y botones pulidos y transiciones suaves.

## Pendiente

- Crear el panel lateral (`sidepanel.html` / `sidepanel.js`) en futuras iteraciones si el usuario lo requiere.
- Añadir un empaquetado/compilación automatizado en caso de migrar a TypeScript.

## Siguiente micro-paso recomendado

Cargar y probar la extensión localmente, realizando peticiones a la API para verificar la respuesta visual del popup.
