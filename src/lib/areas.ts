// Fuente única del color por familia académica.
// Se usa en el buscador, en las tarjetas de la portada y en la ficha de cada
// grado, para que un área tenga siempre el mismo color en todo el sitio.
// Todos los tonos son pasteles claros: el texto encima va en navy y pasa AA.
export const AREA_BG: Record<string, string> = {
  negocios: 'bg-mantequilla',
  'ciencias-ingenieria': 'bg-cielo',
  'sociales-humanidades': 'bg-menta',
  'diseno-creativo': 'bg-melocoton',
};

export const bgArea = (area: string): string => AREA_BG[area] ?? 'bg-lavanda';

// Paleta de apoyo para listas sin área (ventajas, preguntas, guías…), de modo
// que los bloques de color roten siempre en el mismo orden en todo el sitio.
export const TONOS = [
  'bg-mantequilla',
  'bg-cielo',
  'bg-menta',
  'bg-melocoton',
  'bg-lavanda',
  'bg-amarillo-100',
] as const;

export const tono = (i: number): string => TONOS[i % TONOS.length];
