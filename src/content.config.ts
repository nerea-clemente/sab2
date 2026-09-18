import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ---------------------------------------------------------------------------
// Áreas y niveles. Áreas para el buscador; niveles tal cual aparecen en los
// programas daneses (grado, AP/profesionsbachelor de 120 ECTS, y top-up).
// ---------------------------------------------------------------------------
export const AREAS = [
  'ciencias-ingenieria',
  'negocios',
  'sociales-humanidades',
  'diseno-creativo',
] as const;

// Niveles tal y como los nombra el documento maestro de grados.
export const NIVELES = [
  'grado',
  'grado-ingenieria',
  'grado-profesional',
  'ap',
  'top-up',
  'master',
] as const;

// ---------------------------------------------------------------------------
// GRADOS — el núcleo del sitio.
// Las fichas públicas no incluyen universidad, ciudad o campus, cuota de
// admisión, enlaces oficiales ni fecha de revisión: así lo define el documento
// maestro del que salen estos datos.
// ---------------------------------------------------------------------------
const grados = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/grados' }),
  schema: z.object({
    nombre_es: z.string(),
    descripcion: z.string(),
    // Área del buscador y área tal y como la nombra el documento.
    area: z.enum(AREAS),
    area_documento: z.string(),
    nivel: z.enum(NIVELES),
    // Etiqueta literal del título: "Grado de Ingeniería", "AP Degree"…
    titulacion: z.string(),
    duracion_anios: z.number(),
    ects: z.number(),
    idioma: z.string().default('Inglés'),
    comienzo: z.string().default('Agosto / septiembre'),
    // Qué vas a estudiar.
    intro_areas: z.string(),
    areas_estudio: z.array(z.string()).default([]),
    // Cómo es el grado y, cuando aplica, prácticas o experiencia internacional.
    como_es: z.string(),
    practicas: z.string().nullable().default(null),
    // Calendario de admisión propio de cada programa.
    calendario: z
      .array(z.object({ cuando: z.string(), que: z.string() }))
      .default([]),
    requisitos: z.object({
      ingles: z.object({
        toefl: z.number().nullable().default(null),
        ielts: z.number().nullable().default(null),
        cambridge: z.string().nullable().default(null),
        exenciones: z.string().nullable().default(null),
      }),
      // Filas libres de la tabla del documento: materia, titulación previa,
      // portfolio, examen de admisión…
      adicionales: z
        .array(z.object({ requisito: z.string(), condicion: z.string() }))
        .default([]),
    }),
    salidas_laborales: z.array(z.string()).default([]),
    masteres: z.string().default(''),
    matricula: z.string().default(''),
    destacado: z.boolean().default(false),
  }),
});

// ---------------------------------------------------------------------------
// UNIVERSIDADES — stub en la v1 (no hay datos hasta tener los nombres).
// ---------------------------------------------------------------------------
const universidades = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/universidades' }),
  schema: z.object({
    nombre: z.string(),
    ciudad: z.string(),
    url_oficial: z.string().url().nullable().default(null),
    descripcion: z.string().nullable().default(null),
    ultima_verificacion: z.string(),
  }),
});

// ---------------------------------------------------------------------------
// GUÍAS — /estudiar-en-dinamarca/ (motor SEO).
// ---------------------------------------------------------------------------
const guias = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guias' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    // Orden dentro del hub.
    orden: z.number().default(99),
    // Opcional: ya no se muestra fecha de verificación en el sitio.
    ultima_verificacion: z.string().optional(),
    // Preguntas frecuentes para JSON-LD FAQPage.
    faq: z
      .array(z.object({ pregunta: z.string(), respuesta: z.string() }))
      .default([]),
    borrador: z.boolean().default(false),
  }),
});

// ---------------------------------------------------------------------------
// BLOG — desde el día uno.
// ---------------------------------------------------------------------------
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    fecha: z.string(),
    autor: z.string().default('Study and Beyond'),
    etiquetas: z.array(z.string()).default([]),
    // Preguntas frecuentes del post -> JSON-LD FAQPage (SEO/GEO).
    faq: z
      .array(z.object({ pregunta: z.string(), respuesta: z.string() }))
      .default([]),
    borrador: z.boolean().default(false),
  }),
});

export const collections = { grados, universidades, guias, blog };
