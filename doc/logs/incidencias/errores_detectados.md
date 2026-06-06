# Errores detectados

## 2026-06-06 - Riesgo de documentación heredada

- Contexto: el repo IAChrome partía de un README mínimo y pudo recibir documentación copiada de otro repo si se trabaja sin revisar el estado real.
- Riesgo: confundir dominios de IAChrome con dominios de fisioterapia u otros proyectos.
- Decisión: antes de implementar código, revisar que `README.md`, `AGENTS.md`, `doc/estado_actual.md`, `doc/instrucciones/mapa_dominios.md` y relevos hablen únicamente de IAChrome.
