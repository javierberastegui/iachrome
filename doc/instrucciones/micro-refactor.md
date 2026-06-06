# micro-refactor.md

## Propósito

Define la política de mejora local del proyecto.

## Regla central

Toda tarea debe cumplir dos cosas:

1. implementar el objetivo pedido
2. mejorar localmente la calidad interna de los archivos realmente tocados

## Permitido

- extraer helpers pequeños
- separar validaciones
- reducir duplicación evidente
- mejorar nombres internos sin romper contratos públicos
- reforzar manejo de errores
- revisar eventos estructurados

## No permitido

- rehacer el proyecto entero
- cambiar arquitectura
- cambiar rutas base porque sí
- sustituir tecnologías sin orden explícita
- tocar dominios no relacionados
