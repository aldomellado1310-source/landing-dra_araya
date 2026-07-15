# PRODUCT.md — Dra. Javiera Araya M. · Medicina Capilar

## Qué es

Sitio de presentación y demo comercial para la práctica de medicina capilar de la
Dra. Javiera Araya (tricología, injerto FUE) en la región del Biobío, Chile.
Combina tres superficies en una sola página estática:

1. **Landing pública** — posicionamiento médico, tratamientos, alianza
   Lazartigue, sedes y captación de pacientes.
2. **Portal pacientes (demo "Capillum")** — seguimiento postoperatorio día a
   día: planificador 1–30, pauta de medicación, galería de evolución.
3. **Portal médico (demo)** — dashboard de seguimiento postquirúrgico:
   semáforo de pacientes, ingreso rápido, registro fotográfico.

## Usuario y problema

- **Paciente potencial** (hombre/mujer 25–60 con pérdida capilar): necesita
  confiar en una autoridad médica real antes de agendar una evaluación.
- **Paciente operado**: necesita saber qué hacer cada día del postoperatorio
  sin llamar a la clínica.
- **Equipo clínico**: necesita ver de un vistazo qué paciente requiere atención.

## Register

`brand` — la landing es la superficie principal; el diseño ES el producto.
Los dashboards internos son `product` (claridad sobre ornamento).

## Platform

`web` — HTML estático + Tailwind (Play CDN) + JS vanilla. Sin build. Las
imágenes van embebidas en base64 a propósito: el HTML debe funcionar abierto
directamente desde cualquier equipo (file://) y en GitHub Pages.

## Sistema visual

- **Paleta**: navy `#1a2a45` (autoridad médica) · sage `#a3b89c` (calma
  clínica) · creme `#f5f0e8` (calidez) · gold `#c9a96e` (prestigio, solo
  acentos). Definida en `tailwind.config` inline en `index.html`.
- **Tipografía**: Playfair Display (serif, títulos) + Hanken Grotesk (sans, UI/cuerpo).
- **Tono**: clínico-premium. Sobrio, cálido, sin estridencia.

## Happy path de demo (< 3 minutos)

1. Abrir el sitio → hero con promesa médica y foto de la doctora.
2. Scroll guiado: dolores del paciente → perfil (hito Long Hair FUE) →
   arsenal clínico → alianza Lazartigue con recomendador interactivo →
   sedes con agendamiento real → Capillum.
3. Completar el formulario de captación → confirmación inmediata.
4. "Portal Pacientes" → login demo → planificador postoperatorio: mover el
   slider de día, ver calendario de hitos, subir una foto de evolución.
5. "Portal médico" → login demo → dashboard: crear un seguimiento con el
   ingreso rápido y verlo aparecer en la lista; subir foto clínica.

## Dentro / fuera del MVP

**Dentro**: todo el happy path anterior, responsive móvil, accesibilidad
básica (contraste, foco visible, reduced-motion), deploy en GitHub Pages.

**Fuera (decisiones de producto pendientes — no resolver en solo)**:
- Backend real (auth, persistencia, fotos): hoy todo es estado en memoria.
- Número de WhatsApp real para el formulario de captación.
- Precios de tratamientos (hoy "según evaluación", deliberado).
- Marca/naming definitivo de "Capillum".
