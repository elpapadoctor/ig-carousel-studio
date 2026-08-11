# Ejemplo · Carrusel foto + gradiente — variante (b)

Demuestra la **variante (b)**: foto full-bleed con los gradientes de marca al frente
(duotone + fade + grain) y el texto sobre la zona oscura inferior. $0, sin generación AI.

Este ejemplo trae una foto y un copy **reales**: la slide de cierre de un carrusel
publicado por [@elpapadoctor](https://instagram.com/elpapadoctor) sobre higiene íntima
según la evidencia. No necesitas poner nada — ya viene listo para renderizar.

## Cómo renderizar

Desde la raíz del repo:

```bash
npm run carrusel -- examples/carousel-photo
```

Salida: `slides/slide-01.png` (1080×1350).

## Cómo usar tu propia foto

El slide referencia la imagen por **bare filename**
(`<img class="photo" src="s7-foam.jpg" />`). Para usar la tuya:

```bash
cp /ruta/a/tu-foto.jpg brand/photos/tu-foto.jpg
```

y cambia el `src` del `<img class="photo">` en
[`slides/source/slide-01.html`](./slides/source/slide-01.html) por ese nombre.
`carousel.ts` (`resolveBankPhotos`) la copia sola desde `brand/photos/` al source dir
antes de screenshootear — funciona desde cualquier ruta del proyecto.

## Cómo se arma una slide foto

Copia la plantilla [`templates/carousel/photo-slide.html`](../../templates/carousel/photo-slide.html),
edita el copy + el `object-position` de `.photo` para encuadrar la foto, y mantén el
orden de capas: `.photo` → `.duotone` → `.fade` → `.grain` → `.content`.
