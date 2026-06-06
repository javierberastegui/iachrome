# Log backend_modulos - system_events

## Uso del archivo

Historial operativo de la capa central de eventos estructurados de IAChrome.

## Entradas

### 2026-06-06 - Alta documental del dominio

- Objetivo: evitar avisos sueltos en UI, content scripts o conectores.
- Decisiones:
  - primero evento estructurado.
  - después reglas centrales deciden log, resumen o notificación.
- Siguiente paso:
  - crear módulo `events` con tipos estables y dispatcher mínimo.
