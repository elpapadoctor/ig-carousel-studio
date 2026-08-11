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
- **Estructura narrativa** no clara → si `brand/brand.json` tiene un `niche` definido,
  propón primero una de `docs/estructuras-<niche>.md` (lo genera `/setup-marca` para esa
  industria); si el usuario dice que ninguna calza, o no hay `niche` definido, cae a una
  de [`estructuras-narrativas.md`](./estructuras-narrativas.md) según el objetivo.
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
mensaje o inmediatamente después. Estructura tipo "caption writer" — el gancho hace
todo el trabajo antes del corte de Instagram, el cuerpo se lee de un vistazo, y hay
un solo CTA:

- **Gancho (primeros ~125 caracteres)**: tiene que sostenerse solo — Instagram esconde
  el resto del caption tras "más". Coherente con el hook de la slide-01, pero no
  necesita ser copia exacta; puede adelantar el número o la tensión más fuerte del
  carrusel.
- **Cuerpo skimmable**: resumen en líneas cortas (no un párrafo corrido) de los puntos
  del `STORYBOARD.md` — no repitas el texto de las slides palabra por palabra, es el
  resumen para quien no vaya a deslizar las 7.
- **Un solo CTA de cierre**, tomado de `voice.json` → `cta_examples` (o coherente con
  `cta_style`). Nunca un cierre muerto tipo "¿qué opinas?" — que pida guardar, mandar a
  alguien específico, o seguir, con una razón nombrada.
- **Si el carrusel usó fuentes con cita (DOI, guías clínicas, estudios, etc.)**: bloque
  de referencias completo al final — mismo formato que las citas que dio el usuario,
  nunca resumido ni truncado. Si no hubo fuentes citadas (carrusel de opinión/consejo
  general), este bloque no aplica.
- **Hashtags**: set de 3-5, con tamaño mixto (nicho/medio/amplio) — nunca una lista
  larga de tags genéricos. Ver [`hashtag-strategy.md`](./hashtag-strategy.md) para la
  receta completa.

**Antes de entregar el copy final — y antes de mostrar el `STORYBOARD.md` para
aprobación en el paso 2 — corre el scrub de [`humanizer.md`](./humanizer.md)** sobre
ambos: el copy de las slides y el caption. Aplica siempre (nunca se salta por apuro ni
porque "ya está bueno"); cambia forma, no significado.

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
