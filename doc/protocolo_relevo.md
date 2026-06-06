# Protocolo de relevo

## Propósito

Este archivo define cómo debe arrancar y continuar un agente en IAChrome sin perder contexto ni pisar el trabajo de otros dominios.

## Lectura obligatoria antes de tocar nada

Siempre, en este orden:

1. `AGENTS.md`
2. `doc/instrucciones/README.md`
3. instrucciones específicas aplicables al cambio
4. `doc/estado_actual.md`
5. este archivo
6. `doc/instrucciones/mapa_dominios.md`
7. relevo del dominio afectado
8. logs del dominio afectado si existen
9. incidencias abiertas relacionadas
10. prompt activo en `doc/prompts/` si existe

## Qué no debe hacer

- no empezar desde cero
- no reescribir el proyecto por gusto
- no ignorar contexto ya documentado
- no romper arquitectura base
- no dejar cambios sin documentar
- no usar un único relevo global como bitácora principal
- no añadir permisos del navegador sin justificar y documentar
- no guardar secretos en código, docs o logs

## Dónde documentar

- cambio de UI/extensión:
  - `doc/logs/frontend/...`
- cambio de conectores o contratos de agente:
  - `doc/logs/backend_modulos/...`
- error o defecto detectado:
  - `doc/logs/incidencias/errores_detectados.md`
- deuda técnica no urgente:
  - `doc/logs/incidencias/deuda_tecnica.md`
- bloqueo real:
  - `doc/logs/incidencias/bloqueos_actuales.md`
- relevo frontend:
  - `doc/logs/relevos/frontend/...`
- relevo compartido:
  - `doc/logs/relevos/compartidos/...`
