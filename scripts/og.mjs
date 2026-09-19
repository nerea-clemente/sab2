import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

// Genera una imagen social (1200x630) por artículo del blog y por guía.
//
// Las imágenes se generan a mano y se commitean: NO forman parte del build,
// para no arrastrar Playwright (y la descarga de Chromium) al despliegue.
//
//   npm i -D playwright && npx playwright install chromium
//   node scripts/og.mjs
//
// Salida: public/og/blog-<slug>.jpg y public/og/guia-<slug>.jpg
const RAIZ = path.resolve(import.meta.dirname, '..');
// Frontmatter de cada .mdx: titulo e imagen.
function fichas(carpeta, prefijo, rotulo) {
  const dir = `${RAIZ}/src/content/${carpeta}`;
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).sort().map((f) => {
    const fm = /^---\n([\s\S]*?)\n---/.exec(fs.readFileSync(`${dir}/${f}`, 'utf8'))[1];
    const campo = (k) => (new RegExp(`^${k}:\\s*(.*)$`, 'm').exec(fm)?.[1] ?? '').trim().replace(/^"|"$/g, '');
    const slug = f.slice(0, -4);
    return { slug, salida: `${prefijo}-${slug}`, titulo: campo('titulo'), imagen: campo('imagen'), rotulo };
  });
}
const items = [...fichas('blog', 'blog', 'Blog'), ...fichas('guias', 'guia', 'Guía')];
fs.mkdirSync(`${RAIZ}/public/og`, { recursive: true });

// El isotipo se dibuja en línea para no depender de una carga externa.
const isoD = /d="([^"]+)"/.exec(fs.readFileSync(`${RAIZ}/public/favicon.svg`, 'utf8'))[1];

// Tamaño del titular según lo que ocupa: el objetivo es que se lea en la
// miniatura de WhatsApp, así que nunca baja de 42px.
const tam = (t) => (t.length <= 38 ? 68 : t.length <= 52 ? 60 : t.length <= 70 ? 52 : 46);

// Destaca la última palabra fuerte en coral, como hace la web.
function conAcento(t) {
  const esc = t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const m = esc.match(/^(.*[\s:])([^\s:]{4,})([.?!]?)$/);
  if (!m) return esc;
  return `${m[1]}<span style="color:#EE5A44">${m[2]}${m[3]}</span>`;
}

const plantilla = (it) => `<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>
@font-face{font-family:'Plus Jakarta Sans';font-weight:200 800;src:url('file://${RAIZ}/public/fonts/plus-jakarta-sans-latin-var.woff2') format('woff2')}
@font-face{font-family:'DM Mono';font-weight:400 500;src:url('file://${RAIZ}/public/fonts/dm-mono-latin.woff2') format('woff2')}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;display:flex;font-family:'Plus Jakarta Sans',system-ui,sans-serif;background:#F7F3EA;overflow:hidden}
.texto{width:744px;padding:56px 52px;display:flex;flex-direction:column;background:#F7F3EA}
.rotulo{display:inline-flex;align-items:center;gap:12px;font-size:18px;font-weight:800;text-transform:uppercase;letter-spacing:.18em;color:#EE5A44}
.rotulo span{display:block;width:34px;height:4px;border-radius:99px;background:#EE5A44}
h1{margin-top:auto;font-size:${tam(it.titulo)}px;font-weight:800;line-height:1.04;letter-spacing:-.035em;color:#0E2148;text-wrap:balance}
.pie{margin-top:auto;padding-top:26px;display:flex;align-items:center;gap:14px;border-top:2px solid #E5DFD3}
.pie b{font-size:22px;font-weight:800;letter-spacing:-.02em;color:#0E2148;line-height:1.08}
.foto{width:456px;height:630px;object-fit:cover;display:block}
</style></head><body>
<div class="texto">
  <p class="rotulo"><span></span>${it.rotulo}</p>
  <h1>${conAcento(it.titulo)}</h1>
  <div class="pie">
    <svg viewBox="0 0 100 100" width="46" height="46"><rect width="100" height="100" rx="22" fill="#1358E0"/><path fill="#fff" d="${isoD}"/></svg>
    <b>Study &amp;<br>Beyond</b>
  </div>
</div>
<img class="foto" src="${it.dataUri}" alt="">
</body></html>`;

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const it of items) {
  // La imagen va incrustada: un file:// dentro de setContent no resuelve.
  const cand = [1100, 1039, 1008, 992, 976, 958, 941, 900, 880, 760, 674, 640]
    .map((w) => `${RAIZ}/public/img/${it.imagen}-${w}.webp`)
    .find((f) => fs.existsSync(f));
  if (!cand) { console.error('sin imagen:', it.salida, it.imagen); continue; }
  it.dataUri = 'data:image/webp;base64,' + fs.readFileSync(cand).toString('base64');
  await p.setContent(plantilla(it), { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(120);
  await p.screenshot({ path: `${RAIZ}/public/og/${it.salida}.jpg`, type: 'jpeg', quality: 86 });
}
console.log('generadas', items.length, 'imágenes');
await b.close();
