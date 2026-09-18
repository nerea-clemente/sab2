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

export const NIVELES = ['grado', 'master', 'profesionsbachelor', 'top-up'] as const;

// Requisito de inglés: patrón común en los programas.
const requisitoIngles = z.object({
  toefl: z.number().nullable().default(null),
  ielts: z.number().nullable().default(null),
  cambridge: z.string().nullable().default(null),
  exenciones: z.string().nullable().default(null),
});

const asignaturaRequisito = z.object({
  materia: z.string(),
  horas_minimas: z.number().nullable().default(null),
  // Antigüedad máxima admitida (p. ej. "últimos 3 años").
  antiguedad: z.string().nullable().default(null),
});

// ---------------------------------------------------------------------------
// GRADOS — el núcleo del sitio.
// universidad/ciudad/url_oficial/cuota_admision/plazo son opcionales: en la v1
// se publica sin universidad (decisión del cliente). Lo que falte se renderiza
// como "Por confirmar", nunca se inventa.
// ---------------------------------------------------------------------------
const grados = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/grados' }),
  schema: z.object({
    nombre_oficial: z.string(),
    nombre_es: z.string(),
    // Descripción del programa (del booklet). Opcional.
    descripcion: z.string().nullable().default(null),
    universidad: z.string().nullable().default(null),
    ciudad: z.string().nullable().default(null),
    area: z.enum(AREAS),
    nivel: z.enum(NIVELES),
    duracion_anios: z.number(),
    ects: z.number(),
    idioma: z.string().default('Inglés'),
    ramas_especializacion: z.array(z.string()).default([]),
    requisitos: z.object({
      ingles: requisitoIngles,
      asignaturas: z.array(asignaturaRequisito).default([]),
      nota_media_minima: z.string().nullable().default(null),
      examen_admision: z.boolean().default(false),
    }),
    // 1 ó 2 — determina el plazo. null si aún no está verificado.
    cuota_admision: z.union([z.literal(1), z.literal(2)]).nullable().default(null),
    // Comienzo del curso y plazo de solicitud (texto libre).
    comienzo: z.string().default('Agosto'),
    plazo_solicitud: z.string().nullable().default(null),
    salidas_laborales: z.array(z.string()).default([]),
    masteres_afines: z.array(z.string()).default([]),
    url_oficial: z.string().url().nullable().default(null),
    // Fecha o referencia de última verificación (se muestra en la ficha).
    ultima_verificacion: z.string(),
    // Destacar en portada / buscador.
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
