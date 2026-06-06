# Log frontend - browser_context

## Uso del archivo

Historial operativo del dominio de captura de contexto del navegador.

## Entradas

### 2026-06-06 - Alta documental del dominio

- Objetivo: separar contexto del navegador de UI y conectores.
- Decisiones:
  - capturar solo contexto mínimo necesario.
  - bloquear secretos, tokens, cookies, contraseñas y formularios sensibles.
  - emitir eventos estructurados de captura o bloqueo.
- Siguiente paso:
  - implementar sanitizador básico antes de cualquier conector real.

### 2026-06-06 - Extracción de Contexto v0.1.0

- Contexto: Desarrollo del mecanismo para capturar la información de la página actual de forma segura.
- Objetivo: Diseñar e implementar el script de contenido y el constructor del payload.
- Decisiones:
  - Se creó `contentScript.js` como un script inyectable dinámicamente sobre la pestaña activa (usando `chrome.scripting.executeScript`) para minimizar el alcance de permisos e implementar el principio de mínimo privilegio.
  - El content script lee el título, URL, texto seleccionado y extrae de forma limpia el texto visible del cuerpo del documento (removiendo scripts, estilos e iframes).
  - Se implementó `src/payloadBuilder.js` para construir el JSON estructurado según los requisitos exactos y filtrar la información (como limitar el tamaño del texto y excluir links o selección) de acuerdo con las configuraciones del usuario.
- Siguiente paso:
  - Implementar o probar el procesamiento de contextos complejos de página y validar la exclusión correcta de selectores e información sensible.
