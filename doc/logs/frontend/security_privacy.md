# Log frontend - security_privacy

## Uso del archivo

Historial operativo de seguridad y privacidad en IAChrome.

## Entradas

### 2026-06-06 - Alta documental del dominio

- Objetivo: dejar reglas claras antes de implementar content scripts o conectores.
- Decisiones:
  - no registrar contraseñas, cookies, tokens, datos bancarios ni secretos.
  - revisar permisos antes de cada fase funcional.
  - separar acciones propuestas por agentes de acciones ejecutadas.
- Siguiente paso:
  - definir lista inicial de patrones bloqueados por sanitizador.
