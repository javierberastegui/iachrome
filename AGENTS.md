# AGENTS.md

# 🧩 IAChrome

## Propósito del proyecto

IAChrome es una extensión de navegador orientada a conectar el contexto real del navegador con agentes como Antigravity, OpenClaw/Clawky u otros asistentes controlados por el usuario.

El objetivo no es crear una demo suelta. El objetivo es construir una base mantenible para:

- leer contexto útil del navegador de forma controlada
- lanzar prompts desde la extensión
- enviar contexto a un agente autorizado
- recibir propuestas o acciones sugeridas
- registrar eventos estructurados
- mantener seguridad, privacidad y trazabilidad
- evolucionar por etapas sin rehacer el proyecto

## Arquitectura base obligatoria

Mientras no exista decisión explícita en contra, este repo debe crecer sobre esta base:

- Chrome Extension Manifest V3
- TypeScript cuando se añada código de aplicación
- UI separada por superficies: popup, side panel, options y content scripts
- capa de conectores separada de la UI
- capa central de eventos estructurados
- documentación viva por dominio

## Restricciones obligatorias

El agente debe respetar siempre estas reglas:

- no empezar desde cero si existe contexto documental o código previo
- no cambiar arquitectura base sin instrucción expresa
- no cambiar rutas, nombres o superficies asentadas sin necesidad real
- no simplificar artificialmente el proyecto
- no entregar pseudocódigo
- no dar teoría cuando se han pedido cambios aplicables
- entregar siempre archivos completos cuando se proporcionen cambios de código o documentación
- mantener archivos pequeños y conectados entre sí siempre que sea razonable
- no guardar secretos en la extensión ni en documentación
- no exponer tokens de OpenClaw, Antigravity, GitHub, Notion, APIs privadas o servicios externos
- no automatizar acciones sensibles del navegador sin control explícito del usuario
- no construir conectores acoplados directamente a una sola herramienta si puede existir una interfaz común
- si una mejora afecta documentación viva, debe actualizarse

## Guardarraíles de seguridad y privacidad

IAChrome puede acceder a información sensible del navegador. Por eso:

- el contexto de pestaña debe capturarse con mínimo privilegio
- los content scripts no deben extraer más datos de los necesarios
- cualquier captura de DOM debe ser limitada, sanitizada y justificada
- contraseñas, cookies, tokens, datos bancarios y formularios sensibles no deben registrarse ni enviarse a agentes
- los prompts enviados a agentes deben poder auditarse
- las acciones propuestas por agentes deben ser distinguibles de acciones ejecutadas
- las acciones destructivas o sensibles deben requerir confirmación humana
- los logs deben evitar secretos y datos personales innecesarios

## Capa estratégica obligatoria de eventos estructurados

Todo módulo relevante debe poder emitir eventos estructurados. Las notificaciones, avisos o resúmenes deben decidirse por una capa central de reglas, no por avisos sueltos acoplados módulo a módulo.

Principios:

- primero evento estructurado
- después log, resumen, aviso o notificación según reglas centrales
- evitar duplicados entre UI, content scripts y conectores
- separar severidad: debug, info, warning, error, critical
- separar tipo: navegación, contexto, prompt, conector, acción, seguridad, validación
- permitir futura integración con Telegram/OpenClaw sin reescribir módulos

## Dominios iniciales

Debe mantenerse separación entre:

- extensión Chrome / UI
- content scripts y captura de contexto
- conectores de agentes
- núcleo de eventos
- seguridad y privacidad
- documentación operativa
- validación y empaquetado

## Lectura obligatoria antes de tocar nada

Antes de empezar cualquier etapa, el agente debe leer:

1. `AGENTS.md`
2. `doc/instrucciones/README.md`
3. instrucciones específicas aplicables al cambio
4. `doc/estado_actual.md`
5. `doc/protocolo_relevo.md`
6. `doc/instrucciones/mapa_dominios.md`
7. el relevo del dominio afectado
8. los logs del dominio afectado si existen
9. incidencias abiertas relacionadas
10. el prompt activo si existe en `doc/prompts/`

## Forma de trabajo obligatoria

Para cada etapa:

1. entender el estado real actual
2. identificar dominio afectado
3. revisar instrucciones aplicables
4. tocar solo lo necesario
5. aplicar micro-refactor local si procede
6. mantener consistencia con arquitectura, permisos y naming
7. aplicar cambios completos
8. validar proporcionalmente
9. documentar resultado y decisiones
10. actualizar relevo si quedan pasos abiertos
11. dejar siguiente paso claro si la etapa no cierra todo

## Regla final

La prioridad no es hacer cambios rápidos.
La prioridad es construir una extensión útil, segura, trazable y acumulable, capaz de conectar el navegador con agentes sin convertir el repo en una caja negra.
