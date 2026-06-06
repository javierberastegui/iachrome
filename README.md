# 🧠 IAChrome

> Extensión de navegador para conectar el contexto real de Chrome con agentes como Antigravity, OpenClaw/Clawky u otros asistentes controlados por el usuario.

---

## ✨ Qué es este proyecto

**IAChrome** es una extensión pensada para actuar como puente entre el navegador y un agente IA.

La idea no es que la IA “adivine” lo que ocurre en la pantalla. La idea es darle una vía controlada para:

- leer contexto útil de la pestaña activa
- preparar prompts desde el navegador
- enviar contexto sanitizado a un conector autorizado
- recibir respuestas, propuestas o pasos de trabajo
- observar qué se está haciendo sin perder trazabilidad
- registrar eventos estructurados para futuras notificaciones o auditoría

---

## 🧱 Stack previsto

- **Extensión:** Chrome Extension Manifest V3
- **Lenguaje preferente:** TypeScript
- **UI:** popup, side panel, options y content scripts separados
- **Eventos:** capa central de eventos estructurados
- **Conectores:** adaptadores separados para OpenClaw/Clawky, Antigravity u otros agentes
- **Seguridad:** mínimo privilegio, sanitización de contexto y cero secretos en cliente

---

## 🧩 Dominios iniciales

### 1. Extensión / UI

Superficies visibles para el usuario:

- popup
- side panel
- options
- estado de conexión
- formularios de prompt
- visualización de respuesta del agente

### 2. Contexto del navegador

Captura controlada de información útil:

- URL actual
- título de página
- selección del usuario
- texto visible limitado
- metadatos seguros
- contexto manual introducido por el usuario

No debe capturar contraseñas, cookies, tokens, formularios sensibles ni secretos.

### 3. Conectores de agentes

Capa separada para hablar con herramientas externas:

- OpenClaw / Clawky
- Antigravity
- endpoints locales o remotos autorizados
- posibles conectores futuros

La UI no debe saber detalles internos de cada conector.

### 4. Eventos estructurados

Núcleo transversal para trazabilidad:

- eventos de extensión
- eventos de contexto
- eventos de prompt
- eventos de conector
- eventos de seguridad
- eventos de error

Las notificaciones futuras deben decidirse por reglas centrales, no desde cada módulo.

---

## 🗂️ Documentación viva

### Núcleo

- `AGENTS.md`
- `doc/estado_actual.md`
- `doc/estructura.md`
- `doc/protocolo_relevo.md`

### Instrucciones operativas

- `doc/instrucciones/README.md`
- `doc/instrucciones/mapa_dominios.md`
- `doc/instrucciones/micro-refactor.md`
- `doc/instrucciones/leyes_documentacion_operativa.md`

### Logs por dominio

- `doc/logs/frontend/`
- `doc/logs/backend_modulos/`
- `doc/logs/incidencias/`
- `doc/logs/relevos/`

---

## 🚀 Arranque actual

Fase actual: **base documental v0.1**.

Siguiente fase técnica recomendada:

1. crear estructura base de extensión Manifest V3
2. añadir `manifest.json`
3. crear popup mínimo
4. crear side panel mínimo
5. crear núcleo de eventos estructurados
6. crear conector stub para agente local
7. validar carga manual en Chrome

---

## 🔐 Regla de seguridad base

IAChrome no debe almacenar secretos reales en el repositorio ni en la extensión.

Los tokens, URLs privadas o claves deben vivir fuera del código y documentarse solo como variables esperadas, nunca con valores reales.
