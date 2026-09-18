import type { CollectionEntry } from 'astro:content';
import { SITIO } from '@/config/sitio';
import { ruta } from '@/lib/ruta';

export type Grado = CollectionEntry<'grados'>;

export const ETIQUETA_AREA: Record<string, string> = {
  'ciencias-ingenieria': 'Ciencias e ingeniería',
  negocios: 'Negocios',
  'sociales-humanidades': 'Sociales y humanidades',
  'diseno-creativo': 'Diseño y creación',
};

export const ETIQUETA_NIVEL: Record<string, string> = {
  grado: 'Grado',
  master: 'Máster',
  profesionsbachelor: 'AP (profesionsbachelor)',
  'top-up': 'Top-up',
};

// 3 → "3 años"; 3.5 → "3 años y medio"; 1.5 → "1 año y medio".
export function formatoDuracion(anios: number): string {
  const entero = Math.floor(anios);
  const medio = anios - entero >= 0.5;
  const base = entero === 1 ? '1 año' : `${entero} años`;
  return medio ? `${base} y medio` : base;
}

export function ciudadTexto(ciudad: string | null): string {
  return ciudad ?? 'Por confirmar';
}

export function universidadTexto(universidad: string | null): string {
  return universidad ?? 'Por confirmar';
}

// Resumen corto del requisito de inglés para tarjetas.
export function resumenIngles(ingles: Grado['data']['requisitos']['ingles']): string {
  const partes: string[] = [];
  if (ingles.toefl) partes.push(`TOEFL ${ingles.toefl}`);
  if (ingles.ielts) partes.push(`IELTS ${String(ingles.ielts).replace('.', ',')}`);
  return partes.join(' · ');
}

// Datos que alimentan el buscador en cliente (JSON plano, sin lógica).
export interface GradoIndice {
  slug: string;
  nombre: string;
  descripcion: string;
  area: string;
  areaEtiqueta: string;
  nivel: string;
  nivelEtiqueta: string;
  ciudad: string;
  idioma: string;
  cuota: number | null;
  duracion: string;
  ects: number;
  ingles: string;
  url: string;
}

export function aIndice(grado: Grado): GradoIndice {
  const d = grado.data;
  return {
    slug: grado.id,
    nombre: d.nombre_es,
    descripcion: d.descripcion ?? '',
    area: d.area,
    areaEtiqueta: ETIQUETA_AREA[d.area] ?? d.area,
    nivel: d.nivel,
    nivelEtiqueta: ETIQUETA_NIVEL[d.nivel] ?? d.nivel,
    ciudad: d.ciudad ?? '',
    idioma: d.idioma,
    cuota: d.cuota_admision,
    duracion: formatoDuracion(d.duracion_anios),
    ects: d.ects,
    ingles: resumenIngles(d.requisitos.ingles),
    url: ruta(`/grados/${grado.id}/`),
  };
}

// JSON-LD schema.org/Course para cada ficha.
export function jsonLdCurso(grado: Grado) {
  const d = grado.data;
  const jsonld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: d.nombre_es,
    description: d.descripcion ?? SITIO.descripcion,
    inLanguage: 'es',
    url: `${SITIO.dominio}/grados/${grado.id}/`,
    educationalCredentialAwarded: ETIQUETA_NIVEL[d.nivel] ?? d.nivel,
    numberOfCredits: d.ects,
    provider: {
      '@type': 'Organization',
      name: d.universidad ?? SITIO.entidadLegal,
    },
  };
  return jsonld;
}
