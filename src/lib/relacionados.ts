import { getCollection } from 'astro:content';

// ---------------------------------------------------------------------------
// Artículos relacionados de una ficha de grado.
//
// La ficha no se toca: su contenido es el oficial. Lo que se añade debajo es un
// módulo editorial que responde a las tres preguntas que se hace cualquiera que
// está mirando un grado concreto:
//
//   1. ¿Cómo entro?      admisión, requisitos, qué pasa después de solicitar
//   2. ¿Cuánto cuesta?   coste de vida, SU, matrícula
//   3. ¿Cómo se vive?    idioma, alojamiento, trabajo, forma de estudiar
//
// Cada ranura tiene varios candidatos y se elige uno de forma determinista a
// partir del slug del grado. Así las 42 fichas no enlazan todas a los mismos
// tres artículos (eso sería una huella repetida y repartiría mal los enlaces),
// pero cada una enlaza siempre a algo pertinente.
// ---------------------------------------------------------------------------

type Ref = { coleccion: 'blog' | 'guias'; slug: string };

const RANURAS: { rotulo: string; candidatos: Ref[] }[] = [
  {
    rotulo: 'Cómo entro',
    candidatos: [
      { coleccion: 'guias', slug: 'proceso-de-admision' },
      { coleccion: 'blog', slug: 'requisitos-para-estudiar-en-dinamarca-desde-espana' },
      { coleccion: 'blog', slug: 'despues-de-enviar-la-solicitud' },
      { coleccion: 'blog', slug: 'no-me-llega-la-nota-alternativas' },
      { coleccion: 'blog', slug: 'de-espana-a-dinamarca-el-proceso-completo' },
    ],
  },
  {
    rotulo: 'Cuánto cuesta',
    candidatos: [
      { coleccion: 'guias', slug: 'coste-de-vida' },
      { coleccion: 'guias', slug: 'su-beca-estudiantes' },
      { coleccion: 'blog', slug: 'estudiar-en-dinamarca-gratis-que-significa' },
      { coleccion: 'blog', slug: 'pais-donde-te-pagan-por-estudiar' },
      { coleccion: 'guias', slug: 'alojamiento' },
    ],
  },
  {
    rotulo: 'Cómo se vive aquí',
    candidatos: [
      { coleccion: 'blog', slug: 'learning-by-doing-sistema-educativo-danes' },
      { coleccion: 'blog', slug: 'hace-falta-saber-danes' },
      { coleccion: 'guias', slug: 'trabajar-estudiando' },
      { coleccion: 'blog', slug: 'student-jobs-en-dinamarca' },
      { coleccion: 'blog', slug: 'copenhague-o-ciudad-pequena' },
      { coleccion: 'blog', slug: 'moverse-en-bici-dinamarca' },
    ],
  },
];

// Hash estable: mismo grado, mismos artículos en cada build.
function semilla(texto: string): number {
  let h = 0;
  for (let i = 0; i < texto.length; i++) h = (h * 31 + texto.charCodeAt(i)) >>> 0;
  return h;
}

export type ArticuloRelacionado = {
  rotulo: string;
  titulo: string;
  descripcion: string;
  href: string;
  imagen: string | null;
};

export async function relacionadosDeGrado(slugGrado: string): Promise<ArticuloRelacionado[]> {
  const [blog, guias] = await Promise.all([getCollection('blog'), getCollection('guias')]);
  const porId = {
    blog: new Map(blog.map((e) => [e.id, e.data])),
    guias: new Map(guias.map((e) => [e.id, e.data])),
  };

  const h = semilla(slugGrado);
  const salida: ArticuloRelacionado[] = [];

  RANURAS.forEach((ranura, i) => {
    // Se desplaza la ranura con el hash para que dos fichas seguidas no
    // coincidan, y se salta cualquier candidato que ya no exista.
    const n = ranura.candidatos.length;
    for (let k = 0; k < n; k++) {
      const ref = ranura.candidatos[(Math.floor(h / (i + 1)) + k) % n];
      const datos = porId[ref.coleccion].get(ref.slug);
      if (!datos) continue;
      const base = ref.coleccion === 'blog' ? '/blog/' : '/estudiar-en-dinamarca/';
      salida.push({
        rotulo: ranura.rotulo,
        titulo: datos.titulo,
        descripcion: datos.descripcion,
        href: `${base}${ref.slug}/`,
        imagen: datos.imagen ?? null,
      });
      return;
    }
  });

  return salida;
}
