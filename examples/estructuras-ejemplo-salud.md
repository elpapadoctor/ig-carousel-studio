# Ejemplo: catálogo de estructuras para el nicho "salud"

**Este archivo es un ejemplo, no se carga automáticamente.** Es la salida real que
`/setup-marca` generó para una cuenta de salud/medicina durante el desarrollo de esta
herramienta — está acá para mostrar el nivel de detalle y el formato que debería tener
el catálogo que `/setup-marca` genere para **tu** nicho, sea cual sea. Si tu marca es de
salud, puedes usarlo como punto de partida; si es de cualquier otra industria,
`/setup-marca` va a generar uno nuevo específico para la tuya siguiendo este mismo
formato de tabla.

Cuando `/setup-marca` genera tu catálogo real, queda en `docs/estructuras-<tu-nicho>.md`
y **ese** es el que `/carrusel` consulta antes que las 35 estructuras genéricas de
[`estructuras-narrativas.md`](../docs/estructuras-narrativas.md) — no este ejemplo.

A diferencia del catálogo genérico (orientado a marketing frío, agrupado por "tier de
enganche"), estas 9 están pensadas para autoridad médica y confianza — funcionan tanto
si el carrusel le habla a pacientes como si le habla a otros médicos.

## Catálogo

| # | Nombre | Cuándo usarla | Esqueleto de slides |
|---|---|---|---|
| 1 | **Pantallas divididas** | Contraste visual inmediato en dos partes (mito vs realidad, antes vs ahora). Alto impacto, frena el scroll. | S1 hook (planteamiento) → S2 contraste (mal \| bien, dos columnas) → S3 explicación breve → S4 CTA |
| 2 | **Biografía médica** | Recorrido narrativo y humano: trayectoria, por qué elegiste tu especialidad, un aprendizaje clave de tu carrera. | S1 hook (frase de apertura personal) → S2 el inicio/motivo → S3 el quiebre/aprendizaje → S4 dónde estás hoy → S5 CTA |
| 3 | **Tarjetas de aprendizaje "tipo threads"** | Slides identificadas (foto/nombre/especialidad) con fragmentos cortos de información o datos rápidos. | S1 hook (identificación: foto/nombre/especialidad) → S2 dato rápido 1 → S3 dato rápido 2 → S4 dato rápido 3 → S5 CTA |
| 4 | **Guías paso a paso (tutoriales)** | Explicación secuencial que enseña una acción específica de salud o prevención; un proceso complejo dividido en pasos simples. | S1 hook (la acción a enseñar) → S2 paso 1 → S3 paso 2 → S4 paso 3 → S5 paso 4 (opcional) → S6 CTA |
| 5 | **Casos clínicos explicados** | Narrativa de un motivo de consulta real → proceso diagnóstico → solución médica. Siempre con ética y consentimiento, sin datos identificables del paciente. | S1 hook (motivo de consulta, anonimizado) → S2 contexto → S3 proceso diagnóstico → S4 hallazgo → S5 solución/desenlace → S6 lección para el lector → S7 CTA |
| 6 | **Análisis de evidencia científica** | Traducción de hallazgos de investigación a lenguaje claro; respalda las recomendaciones y demuestra medicina basada en evidencia. | S1 hook (la pregunta que responde el estudio) → S2 qué dice el estudio → S3 cómo se hizo (resumido) → S4 qué significa en la práctica → S5 CTA |
| 7 | **Opiniones y posturas médicas** | Corrige errores comunes, desmonta mitos de moda, remedios milagrosos, creencias populares y tendencias virales. | S1 mito (hook) → S2 por qué se cree eso → S3 qué dice la evidencia → S4 qué hacer en su lugar → S5 CTA |
| 8 | **Respuesta a pregunta** | Transforma una inquietud real de un paciente (de comentarios o cajas de preguntas en historias) en una lección de valor para toda la audiencia. | S1 hook (la pregunta tal cual la hizo el paciente) → S2 contexto de por qué se pregunta → S3 la respuesta → S4 matiz/excepción si aplica → S5 CTA |
| 9 | **Comparación "Mal vs Bien"** | Contraste directo entre una mala práctica y la recomendación médica real; texto reducido al mínimo indispensable para que se entienda de un vistazo. | S1 hook (la práctica mal) → S2 por qué está mal → S3 la práctica correcta → S4 CTA |

## Regla no negociable para todas las estructuras

Ninguna de estas 9 estructuras autoriza a **inventar** una afirmación clínica, cifra o
estudio para llenar un slide. Si el intake llega al punto de escribir el `STORYBOARD.md`
y falta un dato médico específico, pídelo al usuario — no lo completes con algo
plausible. Ver `brand/voice.json` → `avoid`.
