# Ejemplo · Carrusel stock royalty-free — variante (c)

Demuestra la **variante (c)**: imágenes ilustrativas de bancos royalty-free, compuestas
con la misma estética foto+gradiente que la variante (b). **No necesita ninguna API key**
por default — Openverse y Wikimedia Commons son de acceso libre. Pexels y Unsplash
siguen disponibles como fuentes opcionales para quien ya tenga una key.

Este ejemplo trae una foto y un copy **reales**: la foto (`stock-01.jpg`, un grifo, vía
Wikimedia Commons) y el copy vienen de un carrusel publicado por
[@elpapadoctor](https://instagram.com/elpapadoctor) sobre higiene íntima según la
evidencia. Ya está descargada y committeada — no necesitas correr nada para renderizar.

## Cómo renderizar

```bash
npm run carrusel -- examples/carousel-stock
```

Salida: `slides/slide-01.png` (1080×1350).

## Cómo volver a descargar (o probar otro query/fuente)

1. **Config** — [`stock-queries.json`](./stock-queries.json) define `source`, `queries`,
   `count`, etc. Este ejemplo usa `source: "wikimedia"`.
2. **Descarga** — desde la raíz del repo:
   ```bash
   npm run scrape-images -- examples/carousel-stock
   ```
   Baja las imágenes a `slides/source/stock-NN.jpg` y escribe
   `slides/source/stock-manifest.json` con fotógrafo + URL + licencia (para atribución).
   Fuentes disponibles en `source`: `"openverse"` (default, sin key), `"wikimedia"`
   (sin key), `"pexels"` (necesita `PEXELS_API_KEY`), `"unsplash"` (necesita
   `UNSPLASH_ACCESS_KEY`).
3. **Render** — el slide referencia la imagen por bare filename (`src="stock-01.jpg"`):
   ```bash
   npm run carrusel -- examples/carousel-stock
   ```

## Licencia y atribución

Openverse (filtrado a licencias que permiten uso comercial + modificación) y Wikimedia
Commons dan license-clear para uso comercial, con licencia **por imagen** — revisa el
campo `license` de cada entrada en `stock-manifest.json`. Pexels y Unsplash tienen una
licencia única por plataforma, más permisiva (no requieren atribución, aunque se
aprecia). El manifest siempre guarda fotógrafo + URL + licencia para acreditar.
