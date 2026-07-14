# Landing · Dra. Javiera Araya M. — Medicina Capilar

Sitio estático de presentación + demo de portal de seguimiento postoperatorio
("Capillum"). HTML + Tailwind (Play CDN) + JavaScript vanilla, sin build.

## Ejecutar la demo desde cero

No hay dependencias que instalar. Dos formas:

```bash
# Opción 1 — servidor local
python3 -m http.server 8080
# → http://localhost:8080

# Opción 2 — abrir directo (las imágenes van embebidas en base64)
open index.html
```

Tailwind va compilado estáticamente en `css/tailwind.css` — el sitio no
depende de ningún CDN de JavaScript. Solo las fuentes (Google Fonts) se
cargan de internet y degradan a las fuentes del sistema si no hay conexión.

### Recompilar Tailwind (solo si cambias clases en el HTML/JS)

```bash
npx tailwindcss@3.4.17 -c tailwind.config.js -i tw-input.css -o css/tailwind.css --minify
```

con `tailwind.config.js` apuntando `content` a `index.html` y `js/app.js`
(el tema navy/sage/creme/gold vive en ese config).

## Guion de demo (~3 minutos)

1. **Landing** — hero con la promesa médica; scroll por dolores del paciente,
   perfil de la doctora (hito Long Hair FUE), arsenal clínico, alianza
   Lazartigue y sedes.
2. **Recomendador Lazartigue** — en la sección alianza, elegir etapa y
   síntoma; la recomendación aparece al completar ambos.
3. **Captación** — completar el formulario y enviar: confirmación por toast.
4. **Portal Pacientes** (botón navbar) — login demo (cualquier credencial):
   mover el slider de día clínico, hacer clic en el calendario de 30 días,
   pestaña "Fotos de evolución" → subir una foto y verla en la galería.
5. **Portal médico** (navbar) — login demo: en "Ingreso rápido" crear un
   paciente y verlo aparecer arriba de la lista de seguimiento; subir una
   foto en "Registro fotográfico".

Ambos portales son demostrativos: no hay backend; el estado vive en memoria
y se reinicia al recargar.

## Estructura

```
index.html      Landing + logins + dashboards (imágenes embebidas en base64)
css/tailwind.css  Tailwind compilado (generado, no editar a mano)
css/styles.css    Utilidades propias, toasts, focus, reduced-motion
js/app.js         Estado demo, navegación de secciones, quiz, dashboards
tailwind.config.js  Tema y contenido para recompilar Tailwind
.github/workflows/deploy.yml  Deploy a GitHub Pages
```

## Deploy

GitHub Pages vía Actions (`deploy.yml`); publica todo el repo en cada push a
las ramas configuradas. `.nojekyll` evita el procesamiento Jekyll.
