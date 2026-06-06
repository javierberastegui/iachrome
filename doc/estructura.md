# Estructura del proyecto

Documentación viva de la estructura real y prevista del repositorio.

## Estado actual

Fase actual: base documental v0.1.

El repositorio contiene documentación operativa inicial y todavía no contiene implementación funcional de extensión.

## Árbol documental vigente

```text
.
├── AGENTS.md
├── README.md
└── doc/
    ├── estado_actual.md
    ├── estructura.md
    ├── protocolo_relevo.md
    ├── instrucciones/
    │   ├── README.md
    │   ├── mapa_dominios.md
    │   ├── micro-refactor.md
    │   └── leyes_documentacion_operativa.md
    └── logs/
        ├── backend_modulos/
        ├── frontend/
        ├── incidencias/
        ├── plantillas/
        └── relevos/
```

## Estructura técnica prevista para la siguiente fase

```text
.
├── extension/
│   ├── manifest.json
│   ├── src/
│   │   ├── background/
│   │   ├── content/
│   │   ├── popup/
│   │   ├── sidepanel/
│   │   ├── options/
│   │   ├── connectors/
│   │   ├── events/
│   │   ├── security/
│   │   └── shared/
│   └── public/
├── scripts/
│   └── validation/
├── doc/
├── AGENTS.md
└── README.md
```
