<div align="center">

# 🎠 ig-carousel-studio

### Generador de carruseles de Instagram — del texto al PNG, con tu marca, sin diseñar a mano

**[English version below ↓](#english)**

Slides **1080×1350** consistentes con tu marca, escritos en HTML + CSS y capturados por
Playwright.
**100 % local · determinístico · $0.** 
Sin necesidad de generación de imágenes con IA en la variante por defecto.

<br>
<img src="docs/assets/slide-01.png" alt="Slide 1" width="20%"><img src="docs/assets/slide-02.png" alt="Slide 2" width="20%"><img src="docs/assets/slide-03.png" alt="Slide 3" width="20%"><img src="docs/assets/slide-04.png" alt="Slide 4" width="20%"><img src="docs/assets/slide-05.png" alt="Slide 5" width="20%"><img src="docs/assets/slide-06.png" alt="Slide 6" width="20%"><img src="docs/assets/slide-07.png" alt="Slide 7" width="20%">






<br>

[![License: MIT](https://img.shields.io/badge/License-MIT-2563EB.svg)](LICENSE)
![Node](https://img.shields.io/badge/Node-18%2B-339933?logo=node.js&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-Chromium-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Costo](https://img.shields.io/badge/costo-%240-success)

</div>

---

## Español

Motor de carruseles + un comando (`/setup-marca`) que te arma tu propia identidad
visual — logo, paleta, tipografía y hasta un catálogo de estructuras narrativas
adaptado a tu industria — conversando contigo, sin rellenar un formulario. 

Una vez configurado con el comando `/carrusel` generas carruseles reales usando tu marca.

> El valor de un carrusel está en **la historia** (la estructura narrativa) y en **tu
> marca** (tus tokens), no en efectos. El agente escribe los slides; el TypeScript solo
> screenshotea. Es determinístico: el mismo HTML produce el mismo PNG siempre.

### Instalación

```bash
git clone https://github.com/elpapadoctor/ig-carousel-studio
cd ig-carousel-studio
./setup.sh
```

`setup.sh` es idempotente: verifica Node, corre `npm install`, instala Chromium y crea
`.env`. Equivalente manual:

```bash
npm install && npx playwright install chromium && cp .env.example .env
```

### Quickstart

1. **Configurá tu marca** (una sola vez):
   ```
   /setup-marca
   ```
   Te va a preguntar nombre, nicho, audiencia, tono, pedirte el logo, ayudarte a
   definir paleta/tipografía (con hex directos, referencias visuales, o un prompt
   listo para pegarle a Claude Design), y generar un catálogo de estructuras
   narrativas para tu industria específica.

2. **Generá un carrusel:**
   ```
   /carrusel 3 errores al elegir tu nicho, educativo, 7 slides
   ```
   Elige estructura, te muestra el outline para aprobar, escribe los HTML, renderiza,
   y te entrega el copy de publicación con hashtags y (si citaste fuentes) referencias
   completas.

¿Sin Claude Code? Probá el ejemplo genérico directo:
```bash
npm run carrusel -- examples/carousel-typographic
```

### Las 3 variantes de slide

Podés mezclarlas en un mismo carrusel.

| Variante | Qué es | Necesita |
|---|---|---|
| **(a) Typographic** | Texto puro, sin imágenes. | nada |
| **(b) Foto + gradiente** | Tus fotos (`brand/photos/`) con wash de marca (duotone + fade + grain). | tus fotos |
| **(c) Stock royalty-free** | Imágenes de Pexels/Unsplash, publicables. | `PEXELS_API_KEY` o `UNSPLASH_ACCESS_KEY` gratis |

### Estructura del repo

```
.claude/commands/setup-marca.md    # onboarding: arma tu brand/ conversando con vos
.claude/commands/carrusel.md       # el generador de carruseles en sí
src/pipelines/carousel.ts          # el motor (Playwright screenshot)
brand/                             # tu marca — starter neutro, lo completa /setup-marca
docs/estructuras-narrativas.md     # 35 estructuras narrativas genéricas
docs/estructuras-<tu-nicho>.md     # lo genera /setup-marca para tu industria
examples/                          # ejemplos corribles, incluido uno de catálogo de nicho
```

### Créditos

- Motor base: [`forge-studio-lite`](https://github.com/Carlos-Dominguez-faber/forge-studio-lite)
  de **Carlos Domínguez** (MIT) — este proyecto parte de ahí.
- Estructuras narrativas genéricas adaptadas de
  [`santmun/historias-ig-skill`](https://github.com/santmun/historias-ig-skill).
- Caso de uso real que probó esta herramienta:
  [@elpapadoctor](https://instagram.com/elpapadoctor) en Instagram.
- Construido para manejarse desde [Claude Code](https://claude.com/claude-code).

### Licencia

[MIT](LICENSE) — usalo, modificalo y compartilo libremente.

---

## English

Carousel engine + one command (`/setup-marca`) that builds your visual identity —
logo, palette, typography, and even a narrative-structure catalog tailored to your
industry — through conversation, not a form. Then `/carrusel` generates real carousels
with that brand.

> A carousel's value is in **the story** (the narrative structure) and **your brand**
> (your tokens), not in effects. The agent writes the slides; the TypeScript just
> screenshots them. Deterministic: the same HTML always produces the same PNG.

### Install

```bash
git clone https://github.com/elpapadoctor/ig-carousel-studio
cd ig-carousel-studio
./setup.sh
```

`setup.sh` is idempotent: checks Node, runs `npm install`, installs Chromium, creates
`.env`. Manual equivalent:

```bash
npm install && npx playwright install chromium && cp .env.example .env
```

### Quickstart

1. **Set up your brand** (once):
   ```
   /setup-marca
   ```
   It asks for your name, niche, audience, and tone, helps you find your logo, guides
   you through defining a palette/typography (direct hex codes, visual references, or
   a ready-to-paste Claude Design prompt), and generates a narrative-structure catalog
   tailored to your specific industry.

2. **Generate a carousel:**
   ```
   /carrusel 3 mistakes people make choosing a niche, educational, 7 slides
   ```
   It picks a structure, shows you the outline for approval, writes the HTML,
   renders, and hands you publish-ready copy with hashtags and (if you cited sources)
   full references.

No Claude Code? Try the generic example directly:
```bash
npm run carrusel -- examples/carousel-typographic
```

### The 3 slide variants

You can mix them within one carousel.

| Variant | What it is | Needs |
|---|---|---|
| **(a) Typographic** | Pure text, no images. | nothing |
| **(b) Photo + gradient** | Your own photos (`brand/photos/`) with a brand-colored wash (duotone + fade + grain). | your photos |
| **(c) Royalty-free stock** | Pexels/Unsplash images, publishable. | free `PEXELS_API_KEY` or `UNSPLASH_ACCESS_KEY` |

### Repo structure

```
.claude/commands/setup-marca.md    # onboarding: builds your brand/ conversationally
.claude/commands/carrusel.md       # the carousel generator itself
src/pipelines/carousel.ts          # the engine (Playwright screenshot)
brand/                             # your brand — neutral starter, /setup-marca fills it in
docs/estructuras-narrativas.md     # 35 generic narrative structures
docs/estructuras-<your-niche>.md   # /setup-marca generates this for your industry
examples/                          # runnable examples, including a niche-catalog sample
```

### Credits

- Base engine: [`forge-studio-lite`](https://github.com/Carlos-Dominguez-faber/forge-studio-lite)
  by **Carlos Domínguez** (MIT) — this project builds on it.
- Generic narrative structures adapted from
  [`santmun/historias-ig-skill`](https://github.com/santmun/historias-ig-skill).
- Real-world account that tested this tool:
  [@elpapadoctor](https://instagram.com/elpapadoctor) on Instagram.
- Built to run from [Claude Code](https://claude.com/claude-code).

### License

[MIT](LICENSE) — use it, modify it, share it freely.
