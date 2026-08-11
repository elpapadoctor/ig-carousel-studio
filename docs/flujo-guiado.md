# Flujo guiado — la filosofía del comando

> **Fuente de verdad del comportamiento guiado.** El command spec
> `.claude/commands/carrusel.md` apunta aquí.

El principio es simple: **recolectar bien → una sola aprobación → ejecutar → ofrecer
ajustes**. El usuario nunca descubre un render después de que ocurrió: lo aprueba antes.
Para el carrusel todo es **$0 y local**, así que el gate no es de gasto sino de
**dirección de contenido** — pero el orden (plan → aprobar → ejecutar) se respeta igual.

---

## El gate del carrusel

### 1. Intake — pregunta solo lo que falta

Si el prompt del usuario ya trae el tema, el objetivo y el # de slides, no re-preguntes —
pasa directo a la autoría del outline. Usa `AskUserQuestion` solo cuando hay una
**bifurcación real** o falta algo material:

- **Objetivo** ambiguo (lead magnet / educativo / prueba social / urgencia / humanización).
- **Estructura narrativa** no clara → si `brand/brand.json` tiene `"niche": "salud"`,
  propón primero una de [`estructuras-medicas.md`](./estructuras-medicas.md); si el
  usuario dice que ninguna calza, cae a una de
  [`estructuras-narrativas.md`](./estructuras-narrativas.md) según el objetivo, igual
  que para cualquier otra marca.
- **# de slides** no especificado (default 7: hook → 5 puntos → CTA).

Una pregunta enfocada, no cinco. No conviertas el intake en burocracia.

### 2. Aprobar el outline — una sola aprobación

Antes de escribir los HTML, escribe `STORYBOARD.md` (1 sección por slide, con su rol y su
copy) y **muéstralo** pidiendo OK. Es barato, pero respeta el principio de "nada sin
aprobación":

```
header:   "Aprobar outline"
question: "Outline para <slug>: <N slides> (<estructura>). ¿Renderizo?"
options:
  - "Aprobar y renderizar"     (Recommended)   → escribe los slide-NN.html + npm run carrusel
  - "Ajustar antes"                            → pregunta qué cambiar, re-edita el outline, vuelve a este gate
  - "Cancelar"
```

### 3. Revisar — regenerar selectivamente

Tras el render, entrega los PNG y **ofrece ajustes**:

```
header:   "Revisión"
question: "Listo: <output>. ¿Algo que ajustar?"
options:
  - "Está bien, ciérralo"
  - "Editar una slide"          → ¿cuál? edita su slide-NN.html y re-corre (re-screenshotea todo, sigue siendo $0)
  - "Cambiar el copy/estructura" → ajusta STORYBOARD.md + los HTML afectados, re-corre
```

Re-renderizar es instantáneo y gratis (todo local), así que iterar slides puntuales no
cuesta nada — cambia el HTML y vuelve a correr `npm run carrusel`.

### 4. Copy de publicación — parte fija del entregable, no un extra

Cuando el usuario aprueba el render ("Está bien, ciérralo"), el trabajo no termina en
los PNG. Genera también el texto para publicar debajo del carrusel, en el mismo
mensaje o inmediatamente después:

- Gancho/intro (1-2 líneas, coherente con el hook de la slide-01).
- Resumen en viñetas de los puntos del `STORYBOARD.md` — no repitas el texto de las
  slides palabra por palabra, es el resumen para quien no vaya a deslizar las 7.
- CTA de cierre, tomado de `voice.json` → `cta_examples` (o coherente con `cta_style`).
- **Si el carrusel usó fuentes con cita (DOI, guías clínicas, estudios, etc.)**: bloque
  de referencias completo al final — mismo formato que las citas que dio el usuario,
  nunca resumido ni truncado. Si no hubo fuentes citadas (carrusel de opinión/consejo
  general), este bloque no aplica.
- Hashtags relevantes al tema y a la marca, si `brand.json`/`voice.json` no dice lo
  contrario.

No inventes datos nuevos en el copy que no estén ya en el `STORYBOARD.md` o en las
fuentes del usuario — misma regla de `voice.json` → `avoid` que rige el copy de las
slides.

---

## Reglas para escribir las opciones de `AskUserQuestion`

- La opción recomendada va primera y se marca como Recommended.
- Las opciones son mutuamente excluyentes y accionables (cada una mapea a un next-step claro).
- Nunca pongas una opción "Otro" — `AskUserQuestion` ya la añade.

---

## Anti-patrones

- ❌ Escribir los 5 HTML sin mostrar el outline primero.
- ❌ Re-preguntar en el intake algo que el usuario ya dijo en su prompt.
- ❌ Renderizar y *después* preguntar si el outline estaba bien. El orden es: plan → aprobar → ejecutar.
