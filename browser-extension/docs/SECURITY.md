# Seguridad y Privacidad - Clawky Browser Copilot

Este documento detalla las directrices de seguridad y privacidad implementadas en **Clawky Browser Copilot** para proteger los datos del usuario durante la navegación y su comunicación con los agentes de Inteligencia Artificial.

## 1. Principio de Mínimo Privilegio (Permissions)

La extensión solicita el número mínimo absoluto de permisos requeridos para funcionar:
*   `activeTab`: Este permiso otorga acceso temporal a la pestaña actualmente activa **sólo cuando el usuario pulsa explícitamente el botón "Analizar página"**. No da acceso permanente ni permite monitorear la navegación en segundo plano.
*   `storage`: Utilizado de forma local en el navegador para almacenar las preferencias de configuración de la extensión.
*   `scripting`: Permite inyectar de manera segura el script de extracción en la pestaña activa al presionar el botón de la interfaz.
*   `host_permissions` (`http://localhost/*`, `http://127.0.0.1/*`): Permite a la extensión comunicarse con servidores locales y APIs de IA (como Ollama, Hermes, Antigravity) para realizar pruebas de conexión y enviar el contexto directamente desde el panel lateral o la página de opciones, evitando bloqueos CORS causados por la falta de cabeceras adecuadas en las APIs locales.

## 2. Captura y Sanitización de Datos

Para proteger la información privada del usuario, la extracción de datos del DOM sigue reglas estrictas:
*   **Sin Lectura Automática**: El análisis de la página y el envío de datos solo ocurren bajo una orden directa del usuario. No existe recolección ni transmisión automatizada o en segundo plano.
*   **Limpieza de Elementos Sensibles**: El content script clona el DOM del cuerpo (`body`) y elimina por completo elementos como `<script>`, `<style>`, `<noscript>`, y etiquetas multimedia para evitar extraer scripts maliciosos.
*   **Sin Datos Financieros o de Autenticación**: El script no lee cookies, no accede a almacenamiento local del sitio web (`localStorage` / `sessionStorage`), ni almacena contraseñas, tokens ni campos de formulario confidenciales.
*   **Control de Tamaño**: Se implementa un límite ajustable (por defecto 50,000 caracteres) en el tamaño del texto plano a enviar para evitar saturar el modelo y transferir grandes volúmenes de datos.

## 3. Aislamiento del Entorno de Ejecución

*   **Sin Ejecución de Código Arbitrario**: La respuesta del servidor de IA se muestra en el popup empleando propiedades de texto plano (`textContent` / `innerText`). **Bajo ninguna circunstancia** se evalúa o inserta HTML dinámico o JavaScript devuelto por la IA, evitando ataques XSS.
*   **Sin Automatización de Acciones**: Esta versión de la extensión es de sólo lectura ("leer contexto + enviar + mostrar respuesta"). No interactúa físicamente con la página activa (hacer clics, rellenar formularios, interactuar con botones o realizar navegaciones automáticas).

## 4. Comunicación Segura y Proveedores Locales

*   La extensión envía la información directamente a los endpoints locales configurados por el usuario.
*   **Proveedores Soportados**:
    *   **Custom / Hermes / Antigravity**: Envían un JSON estructurado completo de contexto al puerto/dirección configurada.
    *   **Ollama**: Compila el contexto en un prompt único de texto y lo envía al endpoint `/api/generate` de la instancia local de Ollama.
*   No hay servidores intermediarios operados por terceros ni telemetría externa. La comunicación se mantiene local en tu máquina (`127.0.0.1` / `localhost`).
