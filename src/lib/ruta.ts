// Prefija los enlaces internos con la base del sitio, para que funcionen tanto
// en la raíz (dominio propio o Netlify) como en un subdirectorio (GitHub Pages,
// p. ej. /studyandbeyond/). Con base "/" no cambia nada.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function ruta(p = '/'): string {
  const path = p.startsWith('/') ? p : `/${p}`;
  return `${BASE}${path}`;
}
