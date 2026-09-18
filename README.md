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
- **Un grado**: un JSON en `src/content/grados/`. El esquema está en
  `src/content.config.ts`; lo que falte se renderiza como «Por confirmar»,
  nunca se inventa.
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

## Imágenes pendientes

Las fotos de personas (fundadora, estudiantes) todavía no existen: en su lugar
se renderiza una superficie pastel de marca con el rótulo, nunca un hueco gris.
Se sustituyen pasando `src` al componente `Imagen.astro`.
