import type { APIRoute } from 'astro';
import { SITIO } from '@/config/sitio';

// En producción (raíz del dominio) se permite indexar y se anuncia el sitemap.
// En cualquier vista previa (base != '/', p. ej. GitHub Pages) se bloquea todo.
const esVistaPrevia = import.meta.env.BASE_URL !== '/';

export const GET: APIRoute = () => {
  const cuerpo = esVistaPrevia
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${SITIO.dominio}/sitemap-index.xml\n`;
  return new Response(cuerpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
