# Relevo - packaging_validation

## Estado actual

Fase v0.1.0 completada. El manifiesto y empaquetado inicial están listos para cargarse en Chrome/Edge.

## Hecho

- Definido `manifest.json` con especificación V3 y configuradas las propiedades fundamentales.
- Los permisos de la extensión se han limitado a `activeTab`, `storage` y `scripting`.

## Pendiente

- Establecer un linter automático o una suite de tests automatizada para el empaquetado de la extensión.

## Siguiente micro-paso recomendado

Realizar la carga manual en `chrome://extensions/` e iniciar pruebas funcionales básicas.
