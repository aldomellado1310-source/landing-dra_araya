# Skills de diseño instaladas

Skills de Claude Code para diseño, polish y animación de la landing. Se cargan
automáticamente al iniciar una sesión de Claude Code en este repo y se invocan
como slash commands (p. ej. `/impeccable polish`).

## Impeccable — [github.com/pbakaus/impeccable](https://github.com/pbakaus/impeccable) (Apache-2.0)

- **impeccable** — skill principal con 23 comandos: `/impeccable craft`, `audit`,
  `critique`, `polish`, `animate`, `bolder`, `quieter`, `colorize`, `typeset`,
  `layout`, `harden`, `optimize`, `live`, etc.
- Agente auxiliar: `.claude/agents/impeccable-manual-edit-applier.md`.
- Hook de diseño: configurado en `.claude/settings.json` (PostToolUse sobre
  Edit/Write); ejecuta el detector de anti-patrones en cada edición de UI.
- Licencia y atribución: `impeccable/LICENSE` y `impeccable/NOTICE.md`.

## Skills de Emil Kowalski — [github.com/emilkowalski/skills](https://github.com/emilkowalski/skills) (MIT)

- **emil-design-eng** — filosofía de design engineering: polish de UI, decisiones
  de animación y detalles invisibles.
- **apple-design** — diseño fluido estilo Apple traducido a la web: springs,
  gestos, materiales, tipografía, reduced-motion.
- **animation-vocabulary** — glosario inverso: describe un efecto de movimiento
  y obtén su nombre exacto.
- **improve-animations** — auditoría de motion del codebase con planes de
  implementación priorizados.
- **review-animations** — review de código de animación con barra de craft alta
  (solo invocable manualmente).

## taste-skill — paquete npm [`taste-skill`](https://www.npmjs.com/package/taste-skill) (MIT)

- **taste-default** — reglas anti-slop base para output de UI.
- **taste-soft-calm** — estética cálida, apagada y con mucho espacio en blanco.
- **taste-redesign** — flujo de auditar-y-mejorar para UI existente.

Instaladas el 2026-07-14 desde las fuentes indicadas, sin modificaciones.
