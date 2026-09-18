// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

// El dominio final. Se usa para canonicals, sitemap y OG.
const SITE = 'https://studyandbeyond.es';

// Base del despliegue. En la raíz es "/". Para GitHub Pages (sitio de
// proyecto) se pasa PUBLIC_BASE="/sab2" desde el workflow.
const BASE = process.env.PUBLIC_BASE || '/';

// Prefija con la base los enlaces internos de los MDX (empiezan por "/").
function rehypeBaseLinks() {
  const base = BASE.replace(/\/$/, '');
  if (!base) return () => {};
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'element') {
        const attr = node.tagName === 'a' ? 'href' : node.tagName === 'img' ? 'src' : null;
        const v = attr && node.properties?.[attr];
        if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//')) {
          node.properties[attr] = base + v;
        }
      }
      (node.children || []).forEach(visit);
    };
    visit(tree);
  };
}

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  markdown: { rehypePlugins: [rehypeBaseLinks] },
  integrations: [
    mdx(),
    sitemap({
      // Fuera del sitemap las páginas noindex (legales, gracias, stub).
      filter: (page) =>
        !/\/(aviso-legal|privacidad|cookies|universidades|sobre-nosotros)\/$/.test(page) &&
        !page.endsWith('/contacto/gracias/'),
    }),
    tailwind({ applyBaseStyles: false }),
    preact(),
  ],
  image: {
    // Permite optimizar imágenes locales con astro:assets.
    responsiveStyles: true,
  },
});
