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
