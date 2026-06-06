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
