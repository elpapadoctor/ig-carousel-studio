# Humanizer — quitar el "tell" de IA del copy

> Consultado por `.claude/commands/carrusel.md` (copy de las slides) y por
> `docs/flujo-guiado.md` → "Copy de publicación" (caption). Aplica a **ambos**,
> no solo al caption final.

Antes de mostrar el `STORYBOARD.md` para aprobación, y antes de entregar el
copy de publicación, corre este scrub. Es rápido (segundos) y nunca es
opcional — ni porque el usuario escribió el texto él mismo, ni porque "ya está
bueno", ni por apuro. Cambia forma, no significado: nunca inventes ni borres
un dato, número o afirmación que no esté en el `STORYBOARD.md` o en las
fuentes del usuario (misma regla que `voice.json` → `avoid`).

## Pase 1 — SCRUB (borrar o reemplazar)

### Nivel forense (siempre activo)

Fuga real de modelo — nada de esto lo escribe una persona:

| Patrón | Acción |
|---|---|
| Guion largo `—` o en dash `–` usado como puntuación | reemplazar por `..`, coma, o punto y aparte |
| `oaicite`, `contentReference`, `turn0search0`, marcadores de herramientas IA | borrar |
| "Como modelo de lenguaje...", "Según mi conocimiento hasta..." | borrar la línea completa |
| `[Tu Nombre]`, `[Marca]`, `[inserta X aquí]` sin completar | marcar y pedirle al usuario que lo complete |

### Nivel estricto (default activo)

Mal estilo de redes, venga de donde venga.

**Vocabulario IA → reemplazo natural (español):**

| Evitar | Usar |
|---|---|
| aprovechar / apalancar (leverage) | usar |
| utilizar | usar |
| optimizar (como muletilla vacía) | mejorar |
| potenciar | ayudar a |
| profundizar / adentrarnos en | ver, mirar |
| elevar (tu contenido/marca) | mejorar |
| desbloquear (tu potencial) | lograr, conseguir |
| robusto | sólido |
| fluido / sin fricciones (seamless) | simple |
| cultivar (una audiencia) | hacer crecer |
| fomentar | construir |
| ecosistema | comunidad, entorno |
| revolucionario / disruptivo | nuevo, distinto (o el dato concreto que lo hace distinto) |

**Vocabulario IA → reemplazo natural (English, si el carrusel es en inglés):**
mismo catálogo que arriba en su forma original — leverage → use, utilize → use,
delve → look at, elevate → lift, streamline → simplify, robust → solid,
seamless → smooth, foster → build, empower → help, unlock → open up,
harness → use, cultivate → grow.

**Adverbios de relleno (borrar):** fundamentalmente, esencialmente,
en última instancia, notablemente, simplemente (como muletilla), realmente
(como muletilla).

**Frases muertas (borrar o reescribir):**
- "en el mundo actual", "en la era digital", "en un mundo cada vez más..."
- "al final del día"
- "cambio de juego", "lleva tu contenido al siguiente nivel", "imprescindible"
- "no se trata solo de X, se trata de Y" (paralelismo negativo — es un tell de
  ritmo de IA; reescribe como afirmación directa)

**Cierres muertos (reescribe a un pedido concreto):**
- "¿Qué opinas?" / "Cuéntame en comentarios"
- "Doble tap si estás de acuerdo"
- "Etiqueta a 3 amigos"
- "Comenta SÍ si quieres la segunda parte"

## Pase 2 — ROMPER (variar el ritmo)

- Varía el largo de línea. Si cada oración mide lo mismo, se lee como
  generado por máquina — rompe al menos una en una línea corta.
- Un fragmento de oración donde encaje ("cada vez.").
- Rompe paralelismos perfectos con una línea asimétrica.

## Pase 3 — AGREGAR (huella humana)

Donde el contenido lo permita:
- 1 número específico (reemplaza "muchos", "bastante", "varios" por la cifra real)
- 1 entidad nombrada (estudio, guía clínica, persona, marca — real, del
  `STORYBOARD.md` o de las fuentes del usuario)
- 1 detalle concreto en primera persona, si aplica al `voice.tone`

Si el input no trae estos datos, pregúntale al usuario — nunca los inventes.

## Scrubs de formato Instagram (siempre aplican)

- **Caption:** el gancho debe sostenerse solo en los primeros ~125 caracteres
  (Instagram esconde el resto tras "más"). Si la segunda línea es necesaria
  para que la primera tenga sentido, reescribe.
- **Hashtags:** nunca 20-30 al inicio ni en medio de una oración. Set de 3-5,
  al final o en el primer comentario — ver [`hashtag-strategy.md`](./hashtag-strategy.md).
- **Emojis:** 0-3 por caption, puestos con intención, nunca uno por línea.
- **Slide 1 (hook):** nunca un título plano — promesa + loop abierto, no una
  descripción genérica ("Guía completa de X").
- **Líneas uniformes:** rompe al menos una en una más corta.
- **Caption sobre 2200 caracteres:** recorta.

## Checklist pre-publicación (antes de entregar el copy final)

**Bloqueantes (si falla alguno, corrige antes de entregar):**
- [ ] Cero guiones largos (`—`/`–`) usados como puntuación.
- [ ] Los primeros ~125 caracteres del caption tienen sentido solos.
- [ ] Caption dentro de 2200 caracteres.
- [ ] 3-5 hashtags con tamaño mixto (nunca 20-30, nunca mid-frase).
- [ ] Sin cebo de engagement ("comenta SÍ", "etiqueta a 3 amigos").
- [ ] Sin apertura tipo "en el mundo actual de..." ni cierre tipo "¿qué opinas?".
- [ ] Sin palabras de la lista de vocabulario IA de arriba.
- [ ] Ningún dato, cifra o afirmación fuera de lo que dio el usuario o el `STORYBOARD.md`.

**Advertencias (marca y sugiere arreglo, no bloquean):**
- [ ] Al menos un número específico donde el contenido lo permita.
- [ ] Al menos una entidad nombrada.
- [ ] Sin lista de tres genérica sin datos concretos ("más rápido, más fácil, mejor").
- [ ] Largo de línea variado, no uniforme.
- [ ] Un solo CTA claro, no tres.

## Ejemplo (antes / después)

**Antes:**
> En el mundo actual, es fundamental optimizar tu presencia digital. No se
> trata solo de publicar, se trata de una estrategia integral. ¡Descubre
> estos tips revolucionarios para llevar tu marca al siguiente nivel! ¿Qué
> opinas? Doble tap si estás de acuerdo.
> #marketing #redessociales #instagram #contenido #estrategia #marca
> #digital #crecimiento #tips #negocios #emprendimiento (sigue hasta 25)

**Después:**
> Publiqué 3 veces por semana durante 4 meses. La cuenta pasó de 0 a 10.000.
>
> no fueron 30 hashtags. no fue publicar todos los días. fue una sola cosa.
>
> cada caption tenía que responder "¿esto se lo mandarías a un amigo?". si la
> respuesta era no, reescribía la primera línea.
>
> guarda esto antes de tu próxima publicación.
>
> #crecimientoorganico #estrategiainstagram #contenidoquefunciona #marketing

**Qué cambió:** se eliminaron "en el mundo actual", "es fundamental",
"optimizar", el paralelismo negativo, "revolucionarios", "al siguiente
nivel", el cierre muerto y el cebo de doble-tap. Se adelantó un número real a
los primeros caracteres. Se redujeron 25 hashtags a un set de 4 con tamaño
mixto.

## Créditos

Adaptado (traducido y ajustado al flujo de este proyecto) de la skill
`ig-humanizer` de [`sergebulaev/instagram-skills`](https://github.com/sergebulaev/instagram-skills)
(MIT).
