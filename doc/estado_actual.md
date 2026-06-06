# Estado actual del proyecto

## Objetivo vivo

Construir una extensión Chrome capaz de conectar el navegador con agentes IA autorizados como Antigravity u OpenClaw/Clawky, permitiendo enviar contexto útil y prompts desde el navegador de forma segura, trazable y modular.

## Arquitectura vigente

Fase actual: documentación base v0.1.

Arquitectura prevista:

- Chrome Extension Manifest V3
- TypeScript cuando se añada código funcional
- UI separada por superficies: popup, side panel, options
- content scripts limitados para contexto de página
- conectores separados para agentes
- núcleo central de eventos estructurados
- documentación viva por dominio

## Módulos activos

Activos documentalmente:

- extension_ui
- browser_context
- agent_connectors
- system_events
- security_privacy
- documentation

No existe todavía implementación funcional de extensión en esta fase.

## Integraciones previstas

- OpenClaw / Clawky
- Antigravity
- posibles endpoints locales del usuario
- posibles endpoints remotos autorizados

## Restricciones vivas

- no guardar secretos reales en el repositorio
- no guardar tokens en documentación
- no capturar contraseñas, cookies, tokens ni datos sensibles
- no automatizar acciones destructivas sin confirmación humana
- no acoplar la UI directamente a un único agente
- no introducir avisos sueltos fuera de la capa central de eventos
- mantener logs y relevos por dominio

## Pendiente inmediato

1. crear estructura base de extensión Manifest V3
2. crear `manifest.json`
3. crear popup mínimo
4. crear side panel mínimo
5. crear módulo de eventos estructurados
6. crear sanitizador básico de contexto
7. crear conector stub para agente local
8. validar carga manual en Chrome
