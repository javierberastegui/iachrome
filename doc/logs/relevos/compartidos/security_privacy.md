# Relevo - security_privacy

## Estado actual

Fase v0.1.0 completada. Políticas estrictas y diseño de seguridad de sólo lectura implementados.

## Hecho

- Limitados los permisos al mínimo en `manifest.json`.
- Evitado el uso de `innerHTML` o evaluación de JS dinámico en la recepción de respuestas de la IA (uso de `textContent`).
- Asegurado que no se guarden ni expongan secretos en la extensión ni en la documentación.
- Creado `docs/SECURITY.md` con las especificaciones de seguridad.

## Pendiente

- Añadir patrones de regex para enmascarar datos personales (ej. emails, DNI/SSN, números de tarjetas de crédito) antes de realizar el envío a la IA.

## Siguiente micro-paso recomendado

Revisar si hay riesgo de fuga de datos en el cuerpo del texto plano extraído y planear un analizador sintáctico para enmascarado.
