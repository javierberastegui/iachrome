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

### 2026-06-06 - Implementación del Conector de API v0.1.0

- Contexto: Desarrollo de la capa de comunicación cliente para enviar contexto de navegación a la API local.
- Objetivo: Diseñar e implementar el cliente HTTP.
- Decisiones:
  - Se desarrolló `src/apiClient.js` encargado de realizar solicitudes HTTP POST con el payload estructurado.
  - Se configuró el endpoint por defecto en `http://127.0.0.1:18789/browser/context`.
  - Se incorporó un mecanismo de abortar/cancelar la petición (Timeout) de 8 segundos usando `AbortController` para evitar esperas infinitas.
  - El cliente emite los eventos `context_send_started`, `context_send_success` y `context_send_error` de forma asíncrona hacia el `eventBus`.
- Siguiente paso:
  - Verificar la integración con un servidor local real (como OpenClaw o Hermes) y evaluar latencias de red o problemas de CORS.

### 2026-06-06 - Soporte Multiproveedor (Ollama, Hermes, Antigravity)

- Contexto: Extender la capacidad del conector para permitir interactuar con APIs de formatos distintos.
- Objetivo: Diseñar el adaptador de payloads y endpoints.
- Decisiones:
  - Se modificó `src/payloadBuilder.js` para compilar un prompt de texto plano para Ollama, mientras se mantiene el JSON estructurado para Hermes, Antigravity y Custom.
  - Se modificó `src/apiClient.js` para direccionar dinámicamente la solicitud HTTP según el proveedor seleccionado y parsear la respuesta JSON de Ollama (propiedad `.response`).
  - Se actualizó `popup.js` para pasar la configuración completa de manera dinámica al cliente.
- Siguiente paso:
  - Validar el flujo de fin a fin apuntando a una instancia real de Ollama u otra API.
