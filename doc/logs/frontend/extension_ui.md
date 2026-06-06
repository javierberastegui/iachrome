# Log frontend - extension_ui

## Uso del archivo

Historial operativo de la UI de IAChrome: popup, side panel, options, estados visuales y experiencia de uso de la extensión.

## Entradas

### 2026-06-06 - Base documental inicial

- Contexto: preparación documental del dominio `extension_ui`.
- Objetivo: dejar preparada la futura UI de extensión.
- Decisiones:
  - separar popup, side panel y options.
  - no acoplar UI directamente a OpenClaw o Antigravity.
  - los conectores deben vivir en dominio separado.
- Siguiente paso:
  - crear estructura base `extension/` con `manifest.json`, popup mínimo y side panel mínimo.

### 2026-06-06 - Implementación de Interfaz de Usuario v0.1.0

- Contexto: Desarrollo de la interfaz gráfica e interactiva de la extensión.
- Objetivo: Diseñar y construir el popup de control y la página de opciones.
- Decisiones:
  - Se crearon `popup.html`, `popup.css` y `popup.js` con un diseño técnico oscuro, limpio y moderno.
  - Se crearon `options.html`, `options.css` y `options.js` para la administración y persistencia de las preferencias del usuario mediante `chrome.storage.local`.
  - Se utilizaron estilos HSL personalizados, efectos visuales de interacción y estados de carga animados para ofrecer una experiencia de usuario premium.
  - Se optó por modularizar la lógica en archivos JavaScript ES6, cargados con `type="module"` en el HTML del popup y de las opciones.
- Siguiente paso:
  - Validar la visualización del popup y la persistencia de las opciones en un entorno de pruebas real en el navegador Chrome.

### 2026-06-06 - Soporte Multiproveedor en UI

- Contexto: Solicitud de integración de Ollama, Hermes y Antigravity.
- Objetivo: Diseñar e implementar controles de selección y parametrización de proveedores en la página de opciones.
- Decisiones:
  - Se modificó `options.html` y `options.js` para añadir un selector de proveedor que oculta y muestra los campos correspondientes a cada servicio de manera interactiva.
  - Se adaptó `options.css` para soportar la visibilidad condicional y la estilización de elementos de formulario adicionales.
- Siguiente paso:
  - Probar visualmente la alternancia de proveedores y comprobar que los campos ocultos no se envíen si el usuario no los guarda.

### 2026-06-06 - Integración de Botón de Prueba de Conexión en Opciones y Permisos de Host

- Contexto: Solicitud de sincronización del botón de prueba de conexión en la página de opciones e incidencias de CORS con endpoints locales.
- Objetivo: Sincronizar el botón "Probar Conexión" en options.html y dotar a la extensión de host_permissions para evitar el bloqueo de CORS al conectar localmente.
- Decisiones:
  - Se replicó el botón "Probar Conexión" e indicador de estado en `options.html`.
  - Se implementó la función `testConnection` en `options.js` con el respectivo manejador del evento click, utilizando un AbortController para un timeout de 4 segundos.
  - Se añadieron estilos en `options.css` para el botón secundario y mensajes de error y éxito de conexión.
  - Se añadió `"host_permissions"` para `http://localhost/*` y `http://127.0.0.1/*` en `manifest.json` para permitir peticiones locales cruzadas desde el panel de opciones y el panel lateral sin bloqueos CORS.
- Siguiente paso:
  - Realizar una verificación final de que la extensión carga correctamente en el navegador y el botón prueba la conexión con éxito contra la API local de IA.
