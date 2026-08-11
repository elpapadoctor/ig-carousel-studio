---
description: Configura la identidad de marca — nombre, nicho, logo, paleta, tipografía y catálogo de estructuras narrativas propio.
argument-hint: (sin argumentos — el comando pregunta todo lo que necesita)
---

# /setup-marca

Configura `brand/brand.json`, `brand/brand.css`, `brand/voice.json` y un catálogo de
estructuras narrativas propio para tu nicho — todo lo que `/carrusel` necesita para
generar carruseles con tu identidad, no con el starter neutro que trae el repo.

## Si `brand/brand.json` ya tiene una marca configurada

Si `brand.json.name` ya es distinto de `"TU MARCA"` (el placeholder del starter),
**pregunta antes de sobreescribir**: `AskUserQuestion` con opciones [Reconfigurar todo]
/ [Cancelar]. Nunca pises una marca ya armada sin confirmación explícita.

## Paso 1 — Identidad

Pregunta agrupado (no interrogatorio de a una pregunta por vez):
- Nombre de la marca/cuenta.
- Nicho o industria (texto libre — ofrece ejemplos si hace falta: salud, fitness,
  finanzas personales, belleza, legal, inmobiliario, gastronomía, tecnología).
- Audiencia objetivo (a quién le habla el contenido).
- 2-4 atributos de tono (ej. "cercano-directo", "experto-sin-jerga").

## Paso 2 — Logo

Pide el archivo del logo. Mismo flujo que ya funciona en la práctica: "dejalo en
Downloads o Desktop y decime el nombre exacto del archivo" — buscalo con `find` una
vez que el usuario confirme el nombre, copialo a `brand/photos/logo.png`. Si no tiene
logo todavía, sigue sin él — no bloquea el resto del setup; `brand.json.logo` queda en
`null`.

## Paso 3 — Paleta y tipografía

Pregunta cuál de estas tres rutas prefiere (`AskUserQuestion`):

1. **Ya tengo colores** — pide los hex directos (mínimo: primary, background, text;
   idealmente también accent, secondary, muted, success, danger).
2. **Tengo referencias visuales** — pedile que comparta screenshots o cuentas que le
   gusten, y propón una paleta + tipografía inspirada en eso, mostrando un preview
   renderizado antes de aplicarlo (proponer → renderizar → ajustar → aprobar).
3. **Quiero que Claude Design me arme una propuesta** — genera un prompt (en el
   idioma del usuario) para pegar en una conversación de Claude Design, con esta
   estructura: contexto de marca, público, tono, restricciones, qué evitar, y el
   formato exacto de salida que `brand.json` puede consumir directo:
   ```
   { "colors": { "primary": "#...", "primary_deep": "#...", "background_dark": "#...",
     "accent": "#...", "secondary": "#...", "background": "#...", "surface": "#...",
     "text": "#...", "muted": "#...", "success": "#...", "danger": "#..." },
     "typography": { "headline": "...", "body": "..." } }
   ```
   Espera a que el usuario vuelva con el resultado antes de seguir.

**En cualquier ruta, advierte explícitamente contra parejas tipográficas genéricas de
IA** — en particular **Lora + Public Sans**, la combinación que un generador de diseño
propone por default muy seguido y que se nota "hecha con IA". Sugiere en su lugar algo
con más carácter según el tono (serif editorial cálida para autoridad, condensada/bold
para hooks virales, geométrica limpia para tech/minimalista) — la decisión final es
del usuario.

## Paso 4 — Catálogo de estructuras del nicho

Con el nicho del paso 1, **razona y genera** (no copies) un catálogo de ~9 estructuras
narrativas específicas de esa industria — mismo formato de tabla que
`docs/estructuras-narrativas.md`:

```
| # | Nombre | Cuándo usarla | Esqueleto de slides |
```

Usa [`examples/estructuras-ejemplo-salud.md`](../../examples/estructuras-ejemplo-salud.md)
como referencia de nivel de detalle y de cómo se ve una fila bien escrita — no la
copies literal, es de otro nicho. Piensa en los formatos de contenido que de verdad
funcionan en esa industria (mitos comunes, comparaciones antes/después, guías paso a
paso, casos reales, datos/cifras con fuente, errores frecuentes, preguntas frecuentes
de la audiencia, etc. — adaptado al nicho concreto, no una lista genérica reciclada).
Guardalo en `docs/estructuras-<slug-del-nicho>.md`, con una intro corta explicando de
qué marca es este catálogo.

## Paso 5 — Escribir la configuración

Con todo lo anterior, escribe:
- `brand/brand.json` — `name`, `tagline`, `positioning`, `colors` (los 10 tokens),
  `typography`, `logo`/`logo_dark` (si hay), `style`, `niche` (el slug del paso 4),
  `safe_words`/`avoid_words` según el tono declarado.
- `brand/brand.css` — mismos tokens que `brand.json.colors`, más `--font-display`/
  `--font-body` de la tipografía elegida.
- `brand/voice.json` — `tone`, `tone_attributes`, `vibe`, `audience`, `language`,
  `hooks` (2-3 de partida), `cta_style`, `cta_examples`, `avoid`, y `grammar` si el
  idioma tiene variantes relevantes (ej. español: pregunta tuteo/voseo/neutro — no
  asumas ninguna).

## Paso 6 — Render de muestra

Genera una slide de hook de prueba con los tokens reales (contenido neutro, sin
afirmaciones de ningún tipo — algo como "Así se ve tu marca en un carrusel real") y
corre `npm run carrusel` sobre un proyecto descartable (`carousels/_preview-marca/`).
Muestra el resultado, pregunta si lo aprueba o si hay que ajustar algo antes de dar por
terminado el setup. Si el usuario pide ajustes, vuelve al paso correspondiente (paleta,
tipografía, etc.) — no re-preguntes todo desde cero.

## Argument
$ARGUMENTS
