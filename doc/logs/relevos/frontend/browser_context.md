# Relevo - browser_context

## Estado actual

Fase v0.1.0 completada. El mecanismo de captura de contexto de la pestaña activa e inyección dinámica está totalmente implementado.

## Hecho

- Diseñado y estructurado el payload de envío según los requisitos del usuario.
- Creado `contentScript.js` para extraer la URL, el título, los headings (H1/H2/H3), los enlaces (hasta un límite de 100) y la selección de texto activa del usuario.
- Creado `src/payloadBuilder.js` para formatear el objeto JSON de salida y aplicar las políticas de sanitización (filtrar enlaces o selección, truncar a la longitud máxima parametrizada).

## Pendiente

- Implementar lógica avanzada de filtrado y exclusión de selectores CSS específicos o selectores de información sensible en el content script.

## Siguiente micro-paso recomendado

Probar la inyección del script de contenido en diferentes páginas y verificar que los elementos se extraen y formatean correctamente.
