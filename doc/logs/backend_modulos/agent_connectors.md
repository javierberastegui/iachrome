# Log backend_modulos - agent_connectors

## Uso del archivo

Historial operativo de conectores lógicos hacia agentes: OpenClaw/Clawky, Antigravity, endpoints locales o remotos autorizados.

## Entradas

### 2026-06-06 - Alta documental del dominio

- Objetivo: separar conectores de UI y de captura de contexto.
- Decisiones:
  - crear interfaz común de conector antes de adaptadores concretos.
  - no guardar secretos en cliente ni documentación.
  - emitir eventos estructurados para request, éxito, fallo y respuesta recibida.
- Siguiente paso:
  - definir contrato mínimo `AgentPromptRequest` y `AgentPromptResponse`.
