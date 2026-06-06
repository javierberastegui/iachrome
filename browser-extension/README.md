# Clawky Browser Copilot - Extensión de Navegador (v0.1.0)

**Clawky Browser Copilot** es una extensión de navegador para Google Chrome y Microsoft Edge (Manifest V3) diseñada para conectar la página activa con tu sistema local de Inteligencia Artificial (por ejemplo, OpenClaw o Hermes). 

Su objetivo es proporcionar un puente controlado y seguro, permitiendo al usuario enviar el contexto de la página web actual junto con instrucciones personalizadas directamente a un servidor local.

---

## 🚀 Características principales

1.  **Lectura Bajo Demanda**: La extensión no recopila información en segundo plano ni monitoriza tu actividad. El análisis e inicio del envío ocurren estrictamente cuando interactúas con la extensión y pulsas el botón.
2.  **Configuración Flexible**: Permite modificar el endpoint, el límite de caracteres a enviar y excluir ciertos metadatos (como la selección de texto o los enlaces de la página).
3.  **Capa Central de Eventos**: Cada módulo emite eventos estructurados que facilitan la trazabilidad y la depuración del sistema en la consola de desarrollo.

---

## 🛠️ Cómo instalar en Modo Desarrollador

Sigue estos pasos para cargar la extensión localmente en tu navegador:

1.  Abre tu navegador (Google Chrome, Microsoft Edge, Brave, Vivaldi, etc.) y dirígete a la sección de extensiones:
    *   En Chrome: Escribe `chrome://extensions/` en la barra de direcciones.
    *   En Edge: Escribe `edge://extensions/` en la barra de direcciones.
2.  En la esquina superior derecha, activa el interruptor **Modo de desarrollador** (Developer mode).
3.  Haz clic en el botón **Cargar descomprimida** (Load unpacked) que aparecerá en la parte superior izquierda.
4.  Selecciona la carpeta `browser-extension` de este repositorio.
5.  ¡Listo! El icono de la extensión aparecerá en tu barra de herramientas.

---

## ⚙️ Configuración del Endpoint

Por defecto, la extensión se comunica con la siguiente dirección:
*   `http://127.0.0.1:18789/browser/context`

Para modificar este endpoint u otros valores:
1.  Haz clic en el icono de la extensión para abrir el popup.
2.  Haz clic en el engranaje (⚙️) en la parte superior derecha.
3.  Se abrirá una nueva pestaña con la página de opciones.
4.  Configura los parámetros (Endpoint, Límite de caracteres, Toggles de links/selección) y presiona **Guardar Configuración**.

*Nota: Asegúrate de que el servidor local al que apunta el endpoint soporte peticiones de tipo CORS (Cross-Origin Resource Sharing) desde la extensión.*

---

## 📦 Ejemplo de Payload Enviado (JSON)

Al presionar "Enviar a IA", la extensión realiza una petición `POST` al endpoint configurado enviando un cuerpo JSON con el siguiente formato:

```json
{
  "source": "browser_extension",
  "event_type": "browser_context_requested",
  "timestamp": "2026-06-06T00:50:00.000Z",
  "page": {
    "url": "https://example.com/articulos/mi-articulo",
    "title": "Un Título Excelente",
    "selection": "texto opcional seleccionado por el usuario en la página",
    "text": "Contenido textual principal de la página, limpio de scripts y estilos...",
    "headings": {
      "h1": ["Un Título Excelente"],
      "h2": ["Sección de ejemplo", "Otra sección"],
      "h3": ["Subsección"]
    },
    "links": [
      {
        "text": "Ir a la documentación",
        "href": "https://example.com/docs"
      }
    ]
  },
  "user_prompt": "Por favor, resume este artículo en tres puntos clave.",
  "extension": {
    "name": "Clawky Browser Copilot",
    "version": "0.1.0"
  }
}
```

---

## 🔒 Limitaciones de Seguridad

*   **Sin JavaScript Arbitrario**: Las respuestas del servidor local se procesan de forma estricta como texto plano, evitando que la IA inyecte scripts XSS en la extensión.
*   **Solo Lectura**: La extensión no está diseñada para realizar clics automáticos, ingresar datos en formularios o realizar navegación automática. 
*   **Privacidad de Datos**: No se recogen cookies de sesión, tokens de autenticación ni datos bancarios.
