<div align="center">

# 🎠 ig-carousel-studio

### Generador de carruseles de Instagram — del texto al PNG, con tu marca, sin diseñar a mano

**[English version below ↓](#english)**

Slides **1080×1350** consistentes con tu marca, escritos en HTML + CSS y capturados por
Playwright.
**100 % local · determinístico · $0.** 
Sin necesidad de generación de imágenes con IA en la variante por defecto.

<br>
<img src="docs/assets/slide-01.png" alt="Slide 1" width="10%"><img src="docs/assets/slide-02.png" alt="Slide 2" width="10%"><img src="docs/assets/slide-03.png" alt="Slide 3" width="10%"><img src="docs/assets/slide-04.png" alt="Slide 4" width="10%"><img src="docs/assets/slide-05.png" alt="Slide 5" width="10%"><img src="docs/assets/slide-06.png" alt="Slide 6" width="10%"><img src="docs/assets/slide-07.png" alt="Slide 7" width="10%">

<br>

<table>
<tr>
<td align="center" width="33%"><img src="docs/assets/variant-typographic.png" alt="Variante A — typographic" width="100%"><br><b>Variante A</b> · typographic</td>
<td align="center" width="33%"><img src="docs/assets/variant-photo.png" alt="Variante B — foto + gradiente" width="100%"><br><b>Variante B</b> · foto + gradiente</td>
<td align="center" width="33%"><img src="docs/assets/variant-stock.png" alt="Variante C — stock royalty-free" width="100%"><br><b>Variante C</b> · stock royalty-free</td>
</tr>
</table>



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
El copy (slides y caption) pasa por un scrub anti-"tells" de IA y termina con un set de
hashtags de tamaño mixto, no una lista genérica — ver `docs/humanizer.md` y
`docs/hashtag-strategy.md`.

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

1. **Configura tu marca** (una sola vez):
   ```
   /setup-marca
   ```
   Te va a preguntar nombre, nicho, audiencia, tono, pedirte el logo, ayudarte a
   definir paleta/tipografía (con hex directos, referencias visuales, o un prompt
   listo para pegarle a Claude Design), y generar un catálogo de estructuras
   narrativas para tu industria específica.

2. **Genera un carrusel:**
   ```
   /carrusel 3 errores al elegir tu nicho, educativo, 7 slides
   ```
   Elige estructura, te muestra el outline para aprobar, escribe los HTML, renderiza,
   y te entrega el copy de publicación con hashtags y (si citaste fuentes) referencias
   completas.

¿Sin Claude Code? Prueba el ejemplo genérico directo:
```bash
npm run carrusel -- examples/carousel-typographic
```

### Las 3 variantes de slide

Puedes mezclarlas en un mismo carrusel.

| Variante | Qué es | Necesita |
|---|---|---|
| **(a) Typographic** | Texto puro, sin imágenes. | nada |
| **(b) Foto + gradiente** | Tus fotos (`brand/photos/`) con wash de marca (duotone + fade + grain). | tus fotos |
| **(c) Stock royalty-free** | Imágenes de Openverse/Wikimedia Commons (sin key) o Pexels/Unsplash (con key), publicables. | nada — o una key gratis si prefieres Pexels/Unsplash |

<table>
<tr>
<td align="center" width="33%"><img src="docs/assets/variant-typographic.png" alt="Variante A — typographic" width="100%"><br><b>Variante A</b> · typographic</td>
<td align="center" width="33%"><img src="docs/assets/variant-photo.png" alt="Variante B — foto + gradiente" width="100%"><br><b>Variante B</b> · foto + gradiente</td>
<td align="center" width="33%"><img src="docs/assets/variant-stock.png" alt="Variante C — stock royalty-free" width="100%"><br><b>Variante C</b> · stock royalty-free</td>
</tr>
</table>

### Estructura del repo

```
.claude/commands/setup-marca.md    # onboarding: arma tu brand/ conversando contigo
.claude/commands/carrusel.md       # el generador de carruseles en sí
src/pipelines/carousel.ts          # el motor (Playwright screenshot)
brand/                             # tu marca — starter neutro, lo completa /setup-marca
docs/estructuras-narrativas.md     # 35 estructuras narrativas genéricas
docs/estructuras-<tu-nicho>.md     # lo genera /setup-marca para tu industria
docs/humanizer.md                  # scrub de "tells" de IA — slides y caption
docs/hashtag-strategy.md           # receta de hashtags con tamaño mixto (3-5)
examples/                          # ejemplos corribles, incluido uno de catálogo de nicho
```

### Créditos

- Motor base: [`forge-studio-lite`](https://github.com/Carlos-Dominguez-faber/forge-studio-lite)
  de **Carlos Domínguez** (MIT) — este proyecto parte de ahí.
- Estructuras narrativas genéricas adaptadas de
  [`santmun/historias-ig-skill`](https://github.com/santmun/historias-ig-skill).
- El scrub de "tells" de IA (`docs/humanizer.md`) y la receta de hashtags con tamaño
  mixto (`docs/hashtag-strategy.md`) están adaptados de
  [`sergebulaev/instagram-skills`](https://github.com/sergebulaev/instagram-skills) (MIT).
- Caso de uso real que probó esta herramienta:
  [@elpapadoctor](https://instagram.com/elpapadoctor) en Instagram.
- Construido para manejarse desde [Claude Code](https://claude.com/claude-code).

### Licencia

[MIT](LICENSE) — úsalo, modifícalo y compártelo libremente.

---

## English

Carousel engine + one command (`/setup-marca`) that builds your visual identity —
logo, palette, typography, and even a narrative-structure catalog tailored to your
industry — through conversation, not a form. Then `/carrusel` generates real carousels
with that brand. The copy (slides and caption) runs through an AI-tell scrub and ends
with a sized hashtag set, not a generic list — see `docs/humanizer.md` and
`docs/hashtag-strategy.md`.

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
| **(c) Royalty-free stock** | Openverse/Wikimedia Commons images (no key) or Pexels/Unsplash (with a key), publishable. | nothing — or a free key if you prefer Pexels/Unsplash |

<table>
<tr>
<td align="center" width="33%"><img src="docs/assets/variant-typographic.png" alt="Variant A — typographic" width="100%"><br><b>Variant A</b> · typographic</td>
<td align="center" width="33%"><img src="docs/assets/variant-photo.png" alt="Variant B — photo + gradient" width="100%"><br><b>Variant B</b> · photo + gradient</td>
<td align="center" width="33%"><img src="docs/assets/variant-stock.png" alt="Variant C — royalty-free stock" width="100%"><br><b>Variant C</b> · royalty-free stock</td>
</tr>
</table>

### Repo structure

```
.claude/commands/setup-marca.md    # onboarding: builds your brand/ conversationally
.claude/commands/carrusel.md       # the carousel generator itself
src/pipelines/carousel.ts          # the engine (Playwright screenshot)
brand/                             # your brand — neutral starter, /setup-marca fills it in
docs/estructuras-narrativas.md     # 35 generic narrative structures
docs/estructuras-<your-niche>.md   # /setup-marca generates this for your industry
docs/humanizer.md                  # scrubs AI "tells" — slide copy and caption
docs/hashtag-strategy.md           # sized (3-5) hashtag recipe
examples/                          # runnable examples, including a niche-catalog sample
```

### Credits

- Base engine: [`forge-studio-lite`](https://github.com/Carlos-Dominguez-faber/forge-studio-lite)
  by **Carlos Domínguez** (MIT) — this project builds on it.
- Generic narrative structures adapted from
  [`santmun/historias-ig-skill`](https://github.com/santmun/historias-ig-skill).
- The AI-tell scrub (`docs/humanizer.md`) and the sized hashtag recipe
  (`docs/hashtag-strategy.md`) are adapted from
  [`sergebulaev/instagram-skills`](https://github.com/sergebulaev/instagram-skills) (MIT).
- Real-world account that tested this tool:
  [@elpapadoctor](https://instagram.com/elpapadoctor) on Instagram.
- Built to run from [Claude Code](https://claude.com/claude-code).

### License

[MIT](LICENSE) — use it, modify it, share it freely.
