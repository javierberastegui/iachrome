# leyes_documentacion_operativa.md

## Propósito

Definir cómo debe escribirse y mantenerse la trazabilidad operativa del proyecto.

## Regla central

La trazabilidad no debe depender de un único archivo global mezclado.

Debe separarse por propósito:

- logs para historial y decisiones por dominio
- relevos para continuidad por dominio
- incidencias para errores, deuda, bloqueos y validaciones pendientes

## Logs por dominio

- frontend/extensión: `doc/logs/frontend/<slug>.md`
- contratos/conectores/eventos: `doc/logs/backend_modulos/<slug>.md`

## Relevos por dominio

- frontend: `doc/logs/relevos/frontend/<slug>.md`
- compartidos: `doc/logs/relevos/compartidos/<slug>.md`

## Incidencias

- errores: `doc/logs/incidencias/errores_detectados.md`
- deuda técnica: `doc/logs/incidencias/deuda_tecnica.md`
- bloqueos: `doc/logs/incidencias/bloqueos_actuales.md`
- pendientes de validación: `doc/logs/incidencias/pendientes_validacion.md`
