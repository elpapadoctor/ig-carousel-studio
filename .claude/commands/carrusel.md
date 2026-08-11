---
description: Genera un carrusel de Instagram (3–10 slides, 1080×1350 PNG) con HTML + estructura narrativa
argument-hint: <tema, número de slides, objetivo (lead magnet / educativo / prueba social / …)>
---

# /carrusel

Carrusel de Instagram en PNG 1080×1350 a partir de slides HTML consistentes con la
marca. **Cero generación AI** — puro HTML + CSS + Playwright screenshot ⇒ determinístico,
gratis y rápido (~7–20s para 7 slides).

El valor del carrusel está en **la historia, no en el diseño**. Por eso antes de escribir
slides eliges una **estructura narrativa** (hook → desarrollo → CTA). Lee
[`docs/estructuras-narrativas.md`](../../docs/estructuras-narrativas.md) y escoge la que
calce con el objetivo del usuario. Si `brand/brand.json` tiene un `niche` definido,
consulta primero `docs/estructuras-<niche>.md` (lo genera `/setup-marca` para tu
industria) antes de recurrir a las 35 genéricas.

## Flujo guiado (OBLIGATORIO)

$0 de generación, pero igual sigue el gate de [`docs/flujo-guiado.md`](../../docs/flujo-guiado.md)
— aquí el gate es de **dirección de contenido**, no de gasto.

1. **Intake**: confirma tema, objetivo (lead magnet / educativo / prueba social / …),
   # de slides y **estructura narrativa** (`docs/estructuras-narrativas.md`). Pregunta solo lo que falte. Si `brand/brand.json` tiene un `niche` definido, consulta primero `docs/estructuras-<niche>.md`.
2. **Outline**: escribe `STORYBOARD.md` (1 sección por slide, rol: hook/punto/prueba/cta).
3. **Aprobar outline**: muestra el outline (rol + copy de cada slide) y pide OK antes de
   escribir los HTML. `AskUserQuestion`: [Aprobar y renderizar] / [Ajustar] / [Cancelar].
4. **Renderizar**: escribe los `slide-NN.html` y `npm run carrusel -- ./carousels/<slug>`.
5. **Revisar**: entrega los PNG; ofrece editar slides puntuales (edita el HTML, re-corre).

## Pipeline

```
Agente (tú):
  1. Lee brand/{brand.json,voice.json,brand.css}
  2. Lee docs/estructuras-narrativas.md (y docs/estructuras-<niche>.md si
     brand.json.niche está definido) → elige estructura según objetivo
  3. Slug kebab-case → ./carousels/<slug>/
  4. STORYBOARD.md (1 sección por slide, rol: hook | punto | prueba | cta)
  5. slides/source/slide-NN.html (self-contained, CSS inline desde brand.css)

TS pipeline:
  npm run carrusel -- ./carousels/<slug>   (= carousel.ts, Playwright screenshot)
```

## Reglas

- **Sin generación AI.** Solo HTML + CSS + screenshot. Cada slide es un archivo
  **self-contained**: copia los tokens de `brand/brand.css` al `<style>`, sin links
  externos a `brand.css` (los paths relativos rompen según dónde viva el proyecto).
- **Siempre 1080×1350.** `html, body, .slide` con dimensiones fijas.
- **Consistente con la voz.** Cada línea respeta `brand/voice.json`: usa `hooks`,
  nunca `avoid`. Tono según `voice.tone`.
- **Keyword-highlighting.** Resalta 1–3 palabras clave por slide con el color primario:
  `<span style="color: var(--primary);">palabra</span>`. Es lo que da el "punch" visual.
- **El hook va en slide-01; el CTA en la última.** Si tienes un logo
  (`brand/photos/logo.png`), úsalo en el footer de **todas** las slides (ver regla de
  contraste abajo), no solo en la de CTA.
- **Foto en todas las slides.** No solo el hook — cada slide
  del carrusel lleva foto+gradiente (ver variante (b) abajo). Cada slide necesita su
  propia imagen o puede reusar una del mismo set temático si no hay más variedad
  disponible; nunca dejes una slide en fondo sólido sin foto salvo pedido explícito.
- **Salto de línea en cada punto.** Dentro del body de una slide, cada oración (cada
  `.` del texto) empieza en su propia línea/párrafo — no dejes dos oraciones seguidas
  en la misma línea de texto corrido. Facilita la lectura al escalar hacia abajo en el
  feed.
- **El handle (`@usuario`) siempre en un pill/botón con contraste garantizado.** Nunca
  como texto suelto sobre una foto — el fondo de la foto varía y el texto puede perder
  legibilidad. Usa un fondo semitransparente + blur, mismo patrón que los badges:
  `background: rgba(14,58,87,0.55); backdrop-filter: blur(6px); border-radius: 999px;
  padding: 8px 16px;` (ajusta el color rgba al `--bg-dark` de la marca activa).
- **Sin voseo.** `brand/voice.json` ahora tiene un campo `grammar` — respétalo. Nunca
  "necesitás/podés/tenés", siempre "necesitas/puedes/tienes" (o la forma neutra que
  pida `voice.json`).
- **Sin "tells" de IA.** Antes de mostrar el `STORYBOARD.md` para aprobación, corre el
  scrub de [`docs/humanizer.md`](../../docs/humanizer.md) sobre el copy de cada slide —
  guiones largos usados como puntuación, vocabulario tipo "aprovechar/optimizar/
  revolucionario", frases muertas ("en el mundo actual", "no se trata solo de X, se
  trata de Y"), listas de tres sin datos concretos. Mismo scrub se corre otra vez sobre
  el copy de publicación (ver `docs/flujo-guiado.md` → paso 4).

## Variantes visuales de slide

Tres formas; puedes **mezclarlas** en un mismo carrusel (p.ej. hook typographic →
puntos typographic → CTA con foto).

### (a) Typographic — texto puro
El skeleton de abajo es un ejemplo completo y funcional (fondo oscuro + tipografía
póster Anton + keyword highlight) — no una paleta obligatoria. Corre `/setup-marca`
primero y este skeleton va a usar tus propios tokens de `brand.css`, no estos. $0, sin
imágenes.

### (b) Foto + gradiente — fotos del banco `brand/photos/`
Foto full-bleed con gradientes de marca **al frente** (duotone + fade + grain) y el texto
sobre la zona oscura inferior. Úsala para hook/CTA con presencia humana o slides "founder".
- **Banco** (gitignored, por marca): pon tus fotos en `brand/photos/`. Refiere cada una
  por su **nombre de archivo** (sin ruta). Convención de ejemplo: `founder.png`,
  `workspace.png`, `product-closeup.png` — usa los nombres reales de tus archivos.
  Elige por contexto (speaker = autoridad, escritorio = "construyendo", retrato = CTA).
- **Referencia por BARE FILENAME** (sin ruta): `<img class="photo" src="founder.png" />`.
  El pipeline copia la foto del banco al source dir antes de renderizar (`resolveBankPhotos`
  en `carousel.ts`) — funciona desde cualquier ruta del proyecto. **No** uses rutas relativas.
- **Plantilla:** copia [`templates/carousel/photo-slide.html`](../../templates/carousel/photo-slide.html),
  edita copy + `object-position` para encuadrar la cara. Mantén el orden de capas:
  `.photo` → `.duotone` → `.fade` → `.grain` → `.content`.

### (c) Stock — imágenes ilustrativas royalty-free
Para slides ilustrativos sin foto propia. Un solo flujo con cuatro fuentes (campo
`source`), todas **publicables royalty-free**:
- **Config:** escribe `<project>/stock-queries.json` →
  `{ "source": "openverse"|"wikimedia"|"pexels"|"unsplash", "queries":[...], "count":6, "max_per_query":15, "prefix":"stock", "orientation":"square" }`.
- **Corre:** `npm run scrape-images -- ./carousels/<slug>`. Descarga a
  `slides/source/<prefix>-NN.jpg` + escribe `slides/source/<prefix>-manifest.json` (atribución + fuente + licencia).
  Los slides las referencian por **bare filename** (`<img class="photo" src="stock-01.jpg">`) — misma estética
  foto+gradiente que (b) (duotone + fade + grain encima homogenizan imágenes dispares).
- **`source: "openverse"` (default) o `"wikimedia"` — license-clear, sin ninguna key.**
  `"pexels"` o `"unsplash"` quedan disponibles para quien ya tenga una key (gratis:
  pexels.com/api · unsplash.com/developers). El manifest guarda fotógrafo + URL +
  licencia por imagen para atribución (openverse/wikimedia varían la licencia por
  imagen; pexels/unsplash tienen una licencia única por plataforma).

## Paso a paso

### 1. Slug
Kebab-case, máx 6 palabras. Ej: *"3 errores al hacer carruseles"* → `3-errores-hacer-carruseles`.

### 2. Estructura del proyecto
```
./carousels/<slug>/
├── STORYBOARD.md            # 1 sección H2 por slide (rol + copy) — el contrato
└── slides/source/slide-NN.html
```

### 3. Slide skeleton (self-contained 1080×1350)

El ejemplo de abajo (fondo oscuro + tipografía póster Anton) es un caso real, validado
a mano slide por slide hasta el tamaño máximo que no se pisa — sirve como punto de
partida funcional. Corre [`/setup-marca`](setup-marca.md) para generar tus propios
`brand.json`/`brand.css` y adapta los tokens de este skeleton a los tuyos.

```html
<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<style>
  /* tokens: copia de brand/brand.css — mantenlos en sync si brand.css cambia */
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Karla:wght@400;500;600;700&display=swap');
  :root {
    --bg-dark: #0B0F1A;
    --primary: #2563EB; --accent: #60A5FA; --secondary: #0EA5E9;
    --danger: #C0392B; --success: #2E9E5B;
    --text: #FFFFFF; --muted: rgba(255,255,255,0.72);
    --font-display: 'Anton', 'Arial Narrow', sans-serif;
    --font-body:    'Karla', -apple-system, sans-serif;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1080px; height: 1350px; background: var(--bg-dark); color: var(--text); font-family: var(--font-body); overflow: hidden; }
  .slide { width: 1080px; height: 1350px; padding: 72px 64px; display: flex; flex-direction: column; justify-content: center; position: relative; }
  /* grain — ruido sutil, mata el look "plano AI" sobre el fondo oscuro */
  .grain {
    position: absolute; inset: 0; pointer-events: none;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>");
    opacity: 0.06; mix-blend-mode: overlay;
  }
  .footer { position: absolute; bottom: 72px; left: 64px; right: 64px; display: flex; align-items: center; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 16px; }
  .brand img { width: 60px; height: 60px; border-radius: 50%; }
  .brand span, .page { font-family: var(--font-body); font-weight: 600; font-size: 26px; color: var(--muted); }
</style>
</head>
<body>
  <div class="slide">
    <div class="grain"></div>
    <!-- contenido por rol, ver tamaños exactos abajo -->
  </div>
  <div class="footer">
    <div class="brand"><img src="logo.png" alt="logo" /><span>@tuhandle</span></div>
    <div class="page">N/N</div>
  </div>
</body>
</html>
```

**Layout por rol** (detalle completo en `docs/estructuras-narrativas.md`) — los
tamaños de abajo son los que funcionaron para el ejemplo con Anton a este
`line-height`; con otra tipografía no aplican igual. Usalos como punto de partida,
después renderiza y ajusta según el método explicado más abajo:

- **hook (slide-01)**: eyebrow/badge arriba (`font-size: 24px`, pill de color según
  tema, `margin-bottom: 24px`) → título (`font-family: var(--font-display)`,
  `font-size: 168px`, `line-height: 0.92`, `max-width: 980px`, MAYÚSCULAS, palabra
  clave en `var(--accent)`) → subtexto opcional (`font-size: 28px`, `margin-top: 24px`,
  `color: var(--muted)`). Toma el hook de `voice.json` `hooks[]`.
- **punto (slide-02..N-1)**: badge (`font-size: 24px`, `margin-bottom: 36px`, pill de
  color — ver abajo) → heading (`font-size: 160px`, `line-height: 0.9`,
  `max-width: 1000px`, `margin-bottom: 44px`, MAYÚSCULAS) → body
  (`font-size: 54px`, `line-height: 1.35`, `max-width: 940px`, `color: var(--muted)`,
  1-2 frases, palabra clave en `var(--accent)`).
- **prueba** — mismo layout que "punto"; el dato/cifra grande puede ir en
  `var(--font-display)` a un tamaño intermedio (~90-120px) si es un número corto.
- **cta (slide-N)** — tagline + handle/URL (de `voice.json`/`brand.json`) + logo
  pequeño opcional, mismo footer que el resto.

**Color del badge según el tipo de contenido** (todos son pills, mismo tamaño):
`var(--danger)` mito/riesgo · `var(--success)` lo que sí funciona · `var(--secondary)`
fuente/autoridad/cita · `var(--accent)` dato destacado.

**El método, no solo el número.** Instagram muestra el carrusel a ~470–600px de ancho
en el feed — texto chico en el render de 1080px se lee mal al escalar hacia abajo. Para
cualquier tipografía que elijas: escribe el body real, sube el `font-size` hasta que
casi se toque con el título o el borde, renderiza, mira el PNG, y baja si se pisa. Los
números de este ejemplo (168/160/54px con Anton) son el resultado de haber hecho
exactamente eso — no una tabla universal.

**Con foto (variante (b)):** en este ejemplo el layout no
centra verticalmente — el `.content`/`.title`/`.body-line` va anclado abajo
(`position: absolute; bottom: 72px`), lo que deja más margen para texto grande arriba.
Validado a mano sobre fotos reales, mismo criterio de "no se pisa":
- **hook**: título hasta **166px** (line-height 0.92, sin max-width fijo si es corto).
- **punto**: título entre **138–158px** según largo del heading (encabezados de 5+
  palabras necesitan el extremo bajo del rango) · body **50–52px**.
- **cta**: título corto tipo "LA REGLA SIMPLE" hasta **150px**; blockquote/cita
  destacada hasta **84px**; texto de apoyo **40px**.
- El handle (`@usuario`) siempre en pill con blur — ver regla de contraste arriba —
  y cada `.` del body en su propio `<div class="body-line">` (salto de línea por
  oración, ver regla arriba).

### 4. Render
```bash
npm run carrusel -- ./carousels/<slug>
```
Salida: `<slug>/slides/slide-NN.png`. Costo $0, ~7–20s.

### 5. Reporta
Path de salida + slug. Opcional `open` del dir en macOS. Incluye el copy de
publicación (ver `docs/flujo-guiado.md` → "Copy de publicación") — no es opcional,
es parte del entregable de cada carrusel.

## Argument
$ARGUMENTS

## Estado
✅ `src/pipelines/carousel.ts` (loop Playwright). `/carrusel` es el único comando — no hay alias en inglés (se eliminó `carousel.md` para no mantener dos copias sincronizadas).
