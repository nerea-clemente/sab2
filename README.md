# Study & Beyond

Sitio de Study & Beyond: orientación y gestión completa para estudiar un grado
en Dinamarca. Astro 5 + Tailwind, estático, en español.

Es la reconstrucción del sitio con la **identidad de marca 2026**. El copy se
mantiene: lo que cambia es el sistema visual. Ver [`DISENO.md`](DISENO.md).

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/
```

Node 22.

## Estructura

```
src/
  components/    Componentes compartidos (Encabezado, Sello, Itinerario…)
  config/        Datos de marca (sitio.ts) e historias de estudiantes
  content/       Contenido: grados (JSON), guías y blog (MDX)
  layouts/       Base.astro: head, fuentes, encabezado y pie
  lib/           areas.ts (color por familia), grados.ts, ruta.ts
  pages/         Una carpeta por ruta
  styles/        global.css: tokens y capa de componentes
public/
  fonts/         Plus Jakarta Sans y DM Mono autoalojadas
  img/           Fotografías
```

## Dónde se edita qué

- **Datos de la empresa, precio, teléfono, navegación**: `src/config/sitio.ts`.
- **Color de una familia académica**: `src/lib/areas.ts`.
- **Tokens de marca**: `tailwind.config.mjs` + `src/styles/global.css`.
- **Logotipo**: `src/lib/marca.ts` (trazado del isotipo) y `Marca.astro`.
- **Un grado**: un JSON en `src/content/grados/`. El esquema está en
  `src/content.config.ts`. Los datos salen del documento maestro de grados;
  las fichas públicas no incluyen universidad, ciudad o campus, cuota de
  admisión, enlaces oficiales ni fecha de revisión, por decisión editorial.
- **Una guía o un artículo**: MDX en `src/content/guias/` o `src/content/blog/`.

## Despliegue

- **Netlify** (producción): `netlify.toml`. El formulario de `/contacto/` usa
  Netlify Forms; se detecta solo desde el HTML estático.
- **GitHub Pages** (vista previa): el workflow construye con
  `PUBLIC_BASE=/sab2` y publica en `gh-pages`. Toda vista previa va en
  `noindex` para no competir con producción.

`src/lib/ruta.ts` prefija los enlaces internos con la base del despliegue, así
que funciona igual en la raíz de un dominio que en un subdirectorio.

## Analítica

Desactivada. Mientras `SITIO.analitica.habilitada` sea `false` el sitio no
carga scripts de terceros ni muestra banner de consentimiento: no hay nada que
consentir. Al configurar un proveedor sin cookies, poner `habilitada: true`.

## Imágenes

Las fotos viven en `public/img/` en WebP, con dos anchos por pieza y el ancho
en el nombre (`aula-proyectos-660.webp`). Se sirven con `srcset` + `sizes`.

Tres cosas pendientes:

- **Resolución.** Las fotos actuales se recortaron de hojas de contactos de
  unos 300 px por viñeta y están reescaladas entre 2x y 3x. Se ven bien a 1x,
  pero quedan blandas en pantallas de alta densidad. Sustituir por los
  originales a tamaño completo manteniendo los nombres de archivo.
- **Retratos.** Las tarjetas de `/historias/` y la de la fundadora en
  `/sobre-mi/` llevan una escena danesa, no un retrato: no se pone una cara
  que no es la de la persona a la que se atribuye la cita. Al tener las fotos
  reales, se cambian ahí.

## Historias, oculta por ahora

`/historias/` sigue construyéndose pero está fuera del menú, fuera de la
portada, fuera del sitemap y en `noindex`. Para volver a publicarla:
descomentar su línea en `NAV` (`src/config/sitio.ts`), quitar `historias` del
filtro del sitemap en `astro.config.mjs`, quitar el `noindex` de la página y
recuperar la sección de portada del historial de git.
