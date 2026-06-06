# Capa de Eventos Estructurados - Clawky Browser Copilot

La extensión dispone de una arquitectura orientada a eventos para desacoplar los distintos módulos (interfaz de usuario, conector, almacenamiento). Este bus de eventos central (`eventBus.js`) permite la trazabilidad y facilita futuras integraciones (por ejemplo, notificaciones hacia el exterior o un sistema central de logs).

## Estructura General de un Evento

Todos los eventos publicados en el `eventBus` siguen esta interfaz común:

```typescript
interface AppEvent {
  type: string;        // Tipo de evento (ver catálogo abajo)
  timestamp: string;   // Fecha y hora en formato ISO 8601
  payload: object;     // Datos específicos asociados al evento
}
```

---

## Catálogo de Eventos

### 1. `page_context_collected`
Emitido por la lógica del popup tras la correcta inyección del `contentScript.js` y la lectura del DOM de la pestaña activa.

*   **Severidad**: `info`
*   **Estructura del Payload**:
    ```json
    {
      "url": "https://example.com/art",
      "title": "Ejemplo de Artículo",
      "selection": "Texto seleccionado opcional",
      "text": "Contenido en texto plano extraído del cuerpo de la página...",
      "headings": {
        "h1": ["Título principal"],
        "h2": ["Sección 1", "Sección 2"],
        "h3": ["Subsección A"]
      },
      "links": [
        { "text": "Contacto", "href": "https://example.com/contacto" }
      ]
    }
    ```

### 2. `context_send_started`
Emitido por el cliente de API (`apiClient.js`) justo antes de iniciar la solicitud HTTP POST hacia el servidor local.

*   **Severidad**: `info`
*   **Estructura del Payload**:
    ```json
    {
      "endpoint": "http://127.0.0.1:11434/api/generate",
      "provider": "ollama",
      "payloadSize": 5420
    }
    ```

### 3. `context_send_success`
Emitido cuando la respuesta del servidor local es recibida con éxito (código de respuesta HTTP de éxito, 2xx).

*   **Severidad**: `info`
*   **Estructura del Payload**:
    ```json
    {
      "status": 200
    }
    ```

### 4. `context_send_error`
Emitido cuando falla la conexión con el servidor local o la inyección del content script debido a restricciones de seguridad.

*   **Severidad**: `error`
*   **Estructura del Payload**:
    ```json
    {
      "error": "No se pudo conectar a la API local en http://127.0.0.1:18789. Asegúrate de..."
    }
    ```

### 5. `settings_updated`
Emitido por la utilidad de almacenamiento (`config.js`) cada vez que el usuario modifica y guarda las opciones de la extensión.

*   **Severidad**: `info`
*   **Estructura del Payload**:
    ```json
    {
      "provider": "ollama",
      "endpoint": "http://127.0.0.1:18789/browser/context",
      "maxTextLength": 50000,
      "includeLinks": true,
      "includeSelection": true,
      "ollamaUrl": "http://127.0.0.1:11434/api/generate",
      "ollamaModel": "llama3",
      "hermesUrl": "http://127.0.0.1:18789/browser/context",
      "antigravityUrl": "http://127.0.0.1:18789/browser/context"
    }
    ```
