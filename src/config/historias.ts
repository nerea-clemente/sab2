// Historias reales de estudiantes (sin foto todavía; foto real pendiente).
// Helena corresponde al futuro servicio de Bachillerato en el extranjero.
export interface Historia {
  slug: string;
  nombre: string;
  carrera: string;
  ciudad: string | null;
  anio: string | null; // pendiente de confirmar
  cita: string;
  futuro?: boolean;
}

export const HISTORIAS: Historia[] = [
  {
    slug: 'nuria',
    nombre: 'Nuria',
    carrera: 'Ingeniería General',
    ciudad: 'Copenhague',
    anio: null,
    cita:
      'Estudio en una de las mejores universidades del mundo, la DTU. Dinamarca me ha dado la oportunidad de estudiar muchísimo, trabajar en algo relacionado con mi carrera y ser independiente de mis padres. Acabo de graduarme y este año empiezo el máster. Y la gente es majísima: he acabado formando una comunidad increíble.',
  },
  {
    slug: 'javier',
    nombre: 'Javier',
    carrera: 'Economía y Administración de Empresas',
    ciudad: 'Aarhus',
    anio: null,
    cita:
      'Desde el primer año trabajé en casos reales con empresas. Uno de esos proyectos acabó en un trabajo a tiempo parcial en una de ellas, y además me fui de Erasmus a Canadá. La carrera te pone delante de problemas de verdad.',
  },
  {
    slug: 'helena',
    nombre: 'Helena',
    carrera: 'Bachillerato Internacional en un internado',
    ciudad: null,
    anio: null,
    futuro: true,
    cita:
      'Me vine a Dinamarca con 16 años a cursar el Bachillerato Internacional en un internado. Estudiar en inglés y vivir fuera de casa tan joven me dio una soltura que ahora, en la universidad, marca la diferencia. Fue el mejor trampolín posible.',
  },
];
