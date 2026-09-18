// Generador de las fichas de grado a partir de los datos extraídos de los
// booklets (curso 2022-2023). Ejecutar una sola vez con `node scripts/seed-grados.mjs`.
// La fuente de verdad tras generarse son los JSON en src/content/grados/.
// Para añadir un grado nuevo NO hace falta este script: basta crear un JSON
// (ver README). Este script solo siembra los 41 iniciales.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'src', 'content', 'grados');
mkdirSync(DIR, { recursive: true });

const VERIF = 'Curso 2022-2023';
const ingStd = {
  toefl: 83, ielts: 6.5,
  cambridge: 'CAE (A, B o C) o FCE (A)',
  exenciones: 'Exento con Bachillerato Internacional (IB) o IGCSE + A-Levels',
};
const ingAlta = { ...ingStd, toefl: 90, ielts: 7 };
const a = (materia, horas_minimas, antiguedad = 'cursadas en los últimos 3 años') =>
  ({ materia, horas_minimas, antiguedad });

// Requisitos base reutilizables.
const req = (ingles, asignaturas = [], extra = {}) => ({
  ingles, asignaturas, nota_media_minima: null, examen_admision: false, ...extra,
});

const G = [
  // ---------- CIENCIAS, TECNOLOGÍA E INGENIERÍAS ----------
  { slug: 'ciencias-cognitivas', nombre: 'Grado en Ciencias Cognitivas', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Estudia la mente, el cerebro y el comportamiento combinando psicología, análisis estadístico de datos y programación para diseñar tus propias investigaciones.',
    ramas: ['Comunicación contemporánea', 'Mentes sociales', 'Ciencia de datos culturales', 'Estudios de datos críticos'],
    req: req(ingStd, [a('Matemáticas', 200), a('Historia, historia de la filosofía o del mundo contemporáneo', 200)]),
    salidas: ['Informática', 'Diseño de productos', 'Investigación en neurociencia', 'Recursos humanos'],
    masteres: ['Neurociencia', 'Ciencias cognitivas'] },

  { slug: 'tecnologia-arquitectura-gestion-construccion', nombre: 'Grado en Tecnología de la Arquitectura y Gestión de la Construcción', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3.5, ects: 210,
    desc: 'Diseña, planifica, ejecuta y gestiona proyectos de construcción. El grado se organiza por proyectos, uno por semestre, con herramientas digitales.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 150)]),
    salidas: ['Consultoría arquitectónica', 'Firmas de arquitectura', 'Diseño de construcciones', 'Coordinación de proyectos'],
    masteres: ['Arquitectura', 'Construcción'] },

  { slug: 'animacion-de-personajes', nombre: 'Grado en Animación de Personajes', area: 'diseno-creativo', nivel: 'grado', dur: 3.5, ects: 210,
    desc: 'Aprende a dar vida a personajes en 2D y 3D con los principios clásicos y los métodos estilizados de la animación, con práctica en preproducción y producción.',
    ramas: [],
    req: req(ingStd, [], { examen_admision: true }),
    salidas: ['Dirección de películas de animación', 'Dirección de arte', 'Diseño de personajes 2D/3D', 'Animación para cine, series o videojuegos'],
    masteres: [] },

  { slug: 'ingenieria-climatica-y-suministros', nombre: 'Grado en Ingeniería Climática y de Suministros', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3.5, ects: 210,
    desc: 'Trabaja en ingeniería del sector del suministro con una base científica en matemáticas, física y química, y un enfoque de digitalización e innovación.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 375), a('Química o Física', 150)]),
    salidas: ['Ingeniería térmica', 'Consultoría de suministros', 'Prevención de inundaciones', 'Sector público y privado de suministros'],
    masteres: ['Ingeniería de suministros', 'Ingeniería energética', 'Ciencias sostenibles'] },

  { slug: 'artes-graficas-digitales', nombre: 'Grado en Artes Gráficas Digitales', area: 'diseno-creativo', nivel: 'grado', dur: 3.5, ects: 210,
    desc: 'Producción de películas de animación 2D y 3D con base sólida en narración y diseño: modelado, texturizado, iluminación y renderizado para videojuegos y cine.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 375), a('Química o Física', 150)]),
    salidas: ['Artista 3D', 'Modelado y texturizado', 'Videojuegos', 'Cine de animación'],
    masteres: [] },

  { slug: 'ingenieria-tecnologica-de-software', nombre: 'Grado en Ingeniería Tecnológica de Software', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3.5, ects: 210,
    desc: 'Programación y desarrollo de sistemas, con conocimientos de ingeniería de datos, medios interactivos y tecnologías de internet.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 375), a('Física', 150)]),
    salidas: ['Desarrollo de software', 'Telecomunicaciones', 'Dirección de proyectos de software', 'Sector energético'],
    masteres: ['Ingeniería tecnológica', 'Ingeniería energética'] },

  { slug: 'ingenieria-electronica', nombre: 'Grado en Ingeniería Electrónica', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Desarrolla productos electrónicos industriales y de consumo: energía renovable, robótica y equipos médicos, con electrónica analógica y digital.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 375), a('Física', 200)]),
    salidas: ['Sector energético', 'Automatización de procesos', 'Electrónica industrial', 'Diseño de equipos médicos'],
    masteres: ['Ingeniería electrónica', 'Informática'] },

  { slug: 'ingenieria-mecanica', nombre: 'Grado en Ingeniería Mecánica', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Resuelve problemas de ingeniería mecánica, diseña productos, plantas y sistemas, y elige métodos de producción óptimos.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 375), a('Física', 200)]),
    salidas: ['Sector energético', 'Jefatura de proyectos', 'Desarrollo de productos', 'Ingeniería de desarrollo'],
    masteres: ['Ingeniería'] },

  { slug: 'ingenieria-mecatronica', nombre: 'Grado en Ingeniería Mecatrónica', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Desarrolla productos de alta tecnología con competencias en diseño técnico, producción y gestión de proyectos, con especialización en mecánica, electrónica o sistemas integrados.',
    ramas: ['Mecánica', 'Electrónica', 'Sistemas integrados'],
    req: req(ingStd, [a('Matemáticas', 375), a('Física', 200)]),
    salidas: ['Ingeniería de desarrollo', 'Gerencia de proyectos', 'Consultoría', 'Docencia e investigación'],
    masteres: ['Cibersistemas y ciberseguridad', 'Ingeniería'] },

  { slug: 'ingenieria-innovacion-y-negocios', nombre: 'Grado en Ingeniería, Innovación y Negocios', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Simulación, realidad virtual y optimización de la fábrica inteligente, uniendo la ingeniería con la innovación y los negocios.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 375), a('Física', 200)]),
    salidas: ['Ingeniería de desarrollo', 'Gerencia de proyectos', 'Consultoría', 'Estrategia empresarial'],
    masteres: ['Ingeniería, Innovación y Negocios', 'Supply Chain'] },

  { slug: 'ingenieria-general', nombre: 'Grado en Ingeniería General', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Primer año común de ciencias naturales con sesgo técnico y después especialización en dos de las cuatro áreas del programa.',
    ramas: ['Sistemas vivos', 'Cibersistemas', 'Energías verdes', 'Materiales'],
    req: req(ingStd, [a('Matemáticas', 375), a('Física', 200)]),
    salidas: ['Según la rama de especialización'],
    masteres: ['Inteligencia y analítica de negocios', 'Biotecnología', 'Inteligencia artificial', 'Ingeniería de los alimentos'] },

  { slug: 'electronica-industrial', nombre: 'Grado en Electrónica Industrial', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Convertidores electrónicos de potencia, máquinas eléctricas, robótica, sistemas integrados y procesamiento de señales.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 375), a('Física', 200)]),
    salidas: ['Sector energético', 'Industria', 'Control de sistemas electrónicos'],
    masteres: ['Ingeniería electrónica', 'Ingeniería de energía'] },

  { slug: 'ingenieria-quimica', nombre: 'Grado en Ingeniería Química', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Química aplicada con teoría y laboratorio: convierte el conocimiento teórico en soluciones prácticas para la industria.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 375), a('Física', 200), a('Química', 200)]),
    salidas: ['Industria química', 'Investigación', 'Desarrollo de procesos'],
    masteres: ['Ingeniería química', 'Ingeniería biotecnológica', 'Nanociencia'] },

  { slug: 'grado-personalizado-ciencias-naturales', nombre: 'Grado Personalizado de Ciencias Naturales', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Grado personalizable al 100 %: solo cuatro asignaturas obligatorias y el resto lo eliges tú, combinando dos especialidades.',
    ramas: ['Bioprocesos científicos', 'Química', 'Informática', 'Biología medioambiental', 'Matemáticas', 'Física'],
    req: req(ingStd, [a('Matemáticas', 375), a('Física', 200), a('Química', 200)]),
    salidas: ['Según las especialidades elegidas'],
    masteres: ['Según las especialidades elegidas'] },

  { slug: 'ingenieria-quimica-y-biotecnologica', nombre: 'Grado en Ingeniería Química y Biotecnológica', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3.5, ects: 210,
    desc: 'Desarrolla procesos y productos sostenibles: tratamiento del agua, protección del medio ambiente y biotecnología industrial.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 375), a('Física', 200), a('Química', 200)]),
    salidas: ['Ingeniería de calidad', 'Control de procesos', 'Industria farmacéutica', 'Investigación'],
    masteres: ['Química', 'Biotecnología', 'Nanociencia'] },

  { slug: 'ciencia-de-datos', nombre: 'Grado en Ciencia de Datos', area: 'ciencias-ingenieria', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Conviértete en analista de datos con habilidades técnicas y de negocio para el manejo, análisis y visualización de grandes volúmenes de datos.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 375, 'cursadas en los últimos 3 años, con una nota mínima de 7')]),
    salidas: ['Analista de datos', 'Científico de datos', 'Analista de negocios y mercados'],
    masteres: ['Informática', 'Ciencia de datos', 'Innovación y negocios'] },

  { slug: 'ap-diseno-multimedia', nombre: 'Grado AP en Diseño Multimedia', area: 'diseno-creativo', nivel: 'profesionsbachelor', dur: 2, ects: 120,
    desc: 'Título AP (equivale a los dos primeros años de grado) centrado en diseño de imágenes y programación. Continúa con un top-up de desarrollo web o de conceptos digitales.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 125)]),
    salidas: ['Diseño digital', 'Desarrollo web'],
    masteres: [] },

  { slug: 'top-up-desarrollo-conceptos-digitales', nombre: 'Top-up en Desarrollo de Conceptos Digitales', area: 'diseno-creativo', nivel: 'top-up', dur: 1.5, ects: 90,
    desc: 'Completa tu grado universitario en año y medio si ya tienes un AP o un ciclo de formación superior. Estrategia y soluciones prácticas en plataformas digitales.',
    ramas: [],
    req: req(ingStd, [a('Un AP degree o un CFS en Marketing, Tecnología, Informática o Diseño', null, null)]),
    salidas: ['Estrategia digital', 'Consultoría digital'],
    masteres: [] },

  { slug: 'top-up-desarrollo-paginas-web', nombre: 'Top-up en Desarrollo de Páginas Web', area: 'diseno-creativo', nivel: 'top-up', dur: 1.5, ects: 90,
    desc: 'Completa tu grado universitario en año y medio si ya tienes un AP o un ciclo de formación superior. Construye sistemas web con IDE orientado a objetos, CMS y bases de datos.',
    ramas: [],
    req: req(ingStd, [a('Un AP degree o un CFS en Marketing, Tecnología, Informática, Diseño web o gráfico', null, null)]),
    salidas: ['Desarrollo web front y back', 'Bases de datos'],
    masteres: [] },

  // ---------- SOCIALES, HUMANÍSTICAS Y ECONÓMICAS ----------
  { slug: 'economia-y-administracion-de-empresas', nombre: 'Grado en Economía y Administración de Empresas', area: 'negocios', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Enfoque internacional de la empresa: marketing, ventas, finanzas, macroeconomía, derecho y comportamiento organizacional.',
    ramas: ['Marketing', 'Finanzas', 'Administración'],
    req: req(ingStd, [a('Matemáticas', 200), a('Economía, historia o historia del mundo contemporáneo', 200)]),
    salidas: ['Empresa multinacional', 'Consultoría', 'Gestión financiera', 'Marketing y administración'],
    masteres: ['Inteligencia y analítica de negocios', 'Marketing B2B y logística', 'Innovación y emprendimiento'] },

  { slug: 'administracion-y-negocios-globales', nombre: 'Grado en Administración y Negocios Globales', area: 'negocios', nivel: 'grado', dur: 3, ects: 180,
    desc: 'La gama de temas de un ADE típico (marketing, contabilidad, finanzas, organización) con la perspectiva internacional del siglo XXI.',
    ramas: ['Marketing', 'Finanzas', 'Organización empresarial'],
    req: req(ingStd, [a('Matemáticas', 200), a('Economía, historia o historia del mundo contemporáneo', 200)], { nota_media_minima: '7 sobre 10' }),
    salidas: ['Coordinación de marketing', 'Analista de mercados', 'Recursos humanos', 'Analista financiero'],
    masteres: ['Marketing', 'Analítica de mercados', 'Contabilidad y finanzas', 'Innovación empresarial'] },

  { slug: 'estudios-europeos', nombre: 'Grado en Estudios Europeos', area: 'sociales-humanidades', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Análisis de estructuras regionales, nacionales y transnacionales desde la ciencia política, los estudios culturales, la historia y la economía.',
    ramas: ['Política e instituciones', 'Integración europea', 'Desarrollo regional', 'Cooperación internacional'],
    req: req(ingStd, [a('Matemáticas', 200), a('Historia, historia de la filosofía o del mundo contemporáneo', 200)], { nota_media_minima: '7 sobre 10' }),
    salidas: ['Instituciones europeas', 'OCDE, embajadas y consulados', 'Empresas internacionales'],
    masteres: ['Estudios europeos', 'Negocios internacionales'] },

  { slug: 'antropologia-de-mercados-y-gestion', nombre: 'Grado en Antropología de Mercados y Gestión', area: 'sociales-humanidades', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Teoría antropológica y métodos prácticos aplicados al marketing y la gestión como procesos sociales: cómo emergen y funcionan los mercados.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 200), a('Historia, historia de la filosofía o del mundo contemporáneo', 200)]),
    salidas: ['Consultoría', 'Especialista en desarrollo e innovación', 'Analista de mercados'],
    masteres: ['Marketing', 'Análisis de mercados', 'Administración y dirección de empresas'] },

  { slug: 'negocios-europa-asia-china', nombre: 'Grado en Negocios entre Europa y Asia — Rama China', area: 'negocios', nivel: 'grado', dur: 4, ects: 240,
    desc: 'Cultura empresarial asiática con un semestre obligatorio en Pekín. Perfil muy solicitado en la economía global. No hace falta saber chino de antemano.',
    ramas: [],
    req: req(ingAlta, [a('Matemáticas', 250), a('Economía, historia o historia del mundo contemporáneo', 200)]),
    salidas: ['Dirección regional', 'Dirección de marketing', 'Logística y compras', 'Negociación'],
    masteres: ['Estudios internacionales', 'Negocios internacionales', 'Cultura asiática'] },

  { slug: 'negocios-europa-asia-japon', nombre: 'Grado en Negocios entre Europa y Asia — Rama Japón', area: 'negocios', nivel: 'grado', dur: 4, ects: 240,
    desc: 'Cultura empresarial asiática con un semestre obligatorio en el extranjero. Perfil muy solicitado en la economía global. No hace falta saber japonés de antemano.',
    ramas: [],
    req: req(ingAlta, [a('Matemáticas', 250), a('Economía, historia o historia del mundo contemporáneo', 200)]),
    salidas: ['Dirección regional', 'Dirección de marketing', 'Logística y compras', 'Negociación'],
    masteres: ['Estudios internacionales', 'Negocios internacionales', 'Cultura asiática'] },

  { slug: 'negocios-idioma-y-cultura-espanola', nombre: 'Grado en Negocios, Idioma y Cultura — Rama Española', area: 'negocios', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Administración de empresas y negocios internacionales combinados con el idioma y la cultura del mercado español y latinoamericano.',
    ramas: [],
    req: req(ingAlta, [a('Matemáticas', 250), a('Economía, historia o historia del mundo contemporáneo', 200)]),
    salidas: ['Dirección regional', 'Marketing', 'Logística y compras'],
    masteres: ['Estudios internacionales', 'Negocios internacionales'] },

  { slug: 'negocios-idioma-y-cultura-francesa', nombre: 'Grado en Negocios, Idioma y Cultura — Rama Francesa', area: 'negocios', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Administración de empresas y negocios internacionales combinados con el idioma y la cultura del mercado francés y franco-canadiense.',
    ramas: [],
    req: req(ingAlta, [a('Matemáticas', 250), a('Economía, historia o historia del mundo contemporáneo', 200), a('Francés: título DELF B1 o superior', null, null)]),
    salidas: ['Dirección regional', 'Marketing', 'Logística y compras'],
    masteres: ['Estudios internacionales', 'Negocios internacionales'] },

  { slug: 'negocios-idioma-y-cultura-alemana', nombre: 'Grado en Negocios, Idioma y Cultura — Rama Alemana', area: 'negocios', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Administración de empresas y negocios internacionales combinados con el idioma y la cultura del mercado alemán.',
    ramas: [],
    req: req(ingAlta, [a('Matemáticas', 250), a('Economía, historia o historia del mundo contemporáneo', 200), a('Alemán: título Goethe-Zertifikat B1 o superior', null, null)]),
    salidas: ['Dirección regional', 'Marketing', 'Logística y compras'],
    masteres: ['Estudios internacionales', 'Negocios internacionales'] },

  { slug: 'administracion-de-empresas-y-sociologia', nombre: 'Grado en Administración de Empresas y Sociología', area: 'negocios', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Administración de empresas con el otro pilar en la sociología: cómo los cambios sociales y culturales impactan en los procesos comerciales.',
    ramas: [],
    req: req(ingAlta, [a('Matemáticas', 250, 'cursadas en los últimos 3 años, con una nota mínima de 7'), a('Economía, historia o historia del mundo contemporáneo', 200)]),
    salidas: ['Dirección de marketing', 'Administración', 'Recursos humanos'],
    masteres: ['Administración', 'Marketing', 'Sociología y cultura'] },

  { slug: 'administracion-de-empresas-y-gestion-digital', nombre: 'Grado en Administración de Empresas y Gestión Digital', area: 'negocios', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Administración de empresas con el otro pilar en la gestión digital: innovación y estrategia digital para la empresa del siglo XXI.',
    ramas: [],
    req: req(ingAlta, [a('Matemáticas', 250, 'cursadas en los últimos 3 años, con una nota mínima de 7'), a('Economía, historia o historia del mundo contemporáneo', 200)]),
    salidas: ['Dirección de innovación digital', 'Marketing digital', 'Análisis de datos'],
    masteres: ['Administración', 'Analítica de datos', 'Arquitectura de estructuras digitales'] },

  { slug: 'administracion-de-empresas-y-gestion-de-servicios', nombre: 'Grado en Administración de Empresas y Gestión de Servicios', area: 'negocios', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Administración de empresas con el otro pilar en la gestión de servicios y especialización en tres ramas según la industria.',
    ramas: ['Arte y cultura', 'Servicios e innovación', 'Turismo y hospitalidad'],
    req: req(ingAlta, [a('Matemáticas', 250), a('Economía, historia o historia del mundo contemporáneo', 200)]),
    salidas: ['Dirección de hotel', 'Agencia de viajes', 'Dirección de museos', 'Marketing y administración'],
    masteres: ['Administración', 'Gestión hotelera'] },

  { slug: 'negocios-internacionales-y-politica', nombre: 'Grado en Negocios Internacionales y Política', area: 'negocios', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Administración de empresas y negocios internacionales con el otro pilar en la política: cómo la política afecta a mercados y empresas.',
    ramas: [],
    req: req(ingAlta, [a('Matemáticas', 250), a('Economía, historia o historia del mundo contemporáneo', 200)]),
    salidas: ['Marketing', 'Investigación de mercados', 'Exportación', 'Dirección'],
    masteres: ['Administración', 'Marketing', 'Política nacional o internacional'] },

  { slug: 'negocios-internacionales', nombre: 'Grado en Negocios Internacionales', area: 'negocios', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Administración de empresas y negocios internacionales: estrategia empresarial, internacionalización y marketing.',
    ramas: [],
    req: req(ingAlta, [a('Matemáticas', 250), a('Economía, historia o historia del mundo contemporáneo', 200)]),
    salidas: ['Marketing', 'Investigación de mercados', 'Exportación', 'Dirección'],
    masteres: ['Administración', 'Marketing', 'Negocios internacionales'] },

  { slug: 'transporte-mercantil-maritimo', nombre: 'Grado en Transporte Mercantil Marítimo', area: 'negocios', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Economía empresarial, transporte marítimo y comercio, con un semestre en Singapur o Texas y experiencia práctica en la industria.',
    ramas: [],
    req: req(ingAlta, [a('Matemáticas', 250), a('Economía, historia o historia del mundo contemporáneo', 200)]),
    salidas: ['Dirección de logística', 'Analista de cadena de valor', 'Optimización del transporte de mercancías'],
    masteres: ['Transporte y cadena de valor', 'Derecho marítimo o mercantil'] },

  { slug: 'grado-personalizado-en-humanidades', nombre: 'Grado Personalizado en Humanidades', area: 'sociales-humanidades', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Grado personalizable: solo seis asignaturas obligatorias y el resto lo eliges tú, combinando dos especialidades humanísticas.',
    ramas: ['Comunicación', 'Cultura', 'Psicología'],
    req: req(ingStd, [a('Historia, historia de la filosofía o del mundo contemporáneo', 200), a('Otro idioma cursado durante el bachillerato', null, null)]),
    salidas: ['Según las especialidades elegidas'],
    masteres: ['Según las especialidades elegidas'] },

  { slug: 'grado-personalizado-en-ciencias-sociales', nombre: 'Grado Personalizado en Ciencias Sociales', area: 'sociales-humanidades', nivel: 'grado', dur: 3, ects: 180,
    desc: 'Grado personalizable: solo seis asignaturas obligatorias y el resto lo eliges tú, combinando dos especialidades sociales.',
    ramas: ['Administración y dirección de empresas', 'Negocios y emprendimiento', 'Estudios internacionales'],
    req: req(ingStd, [a('Matemáticas', 200, 'cursadas en los últimos 3 años, con una nota mínima de 6'), a('Economía, historia o historia del mundo contemporáneo', 200)], { nota_media_minima: '7 sobre 10' }),
    salidas: ['Según las especialidades elegidas'],
    masteres: ['Según las especialidades elegidas'] },

  { slug: 'ap-diseno-de-moda', nombre: 'Grado AP en Diseño de Moda', area: 'diseno-creativo', nivel: 'profesionsbachelor', dur: 2, ects: 120,
    desc: 'Título AP (equivale a los dos primeros años de grado) centrado en el diseño de indumentaria y la tecnología de los materiales. Continúa con un top-up de moda.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 125)]),
    salidas: ['Diseño de moda', 'Industria textil'],
    masteres: [] },

  { slug: 'ap-marketing-y-branding-de-moda', nombre: 'Grado AP en Marketing y Branding de Moda', area: 'diseno-creativo', nivel: 'profesionsbachelor', dur: 2, ects: 120,
    desc: 'Título AP (equivale a los dos primeros años de grado) centrado en el marketing y el branding para la industria textil. Continúa con un top-up de moda.',
    ramas: [],
    req: req(ingStd, [a('Matemáticas', 125)]),
    salidas: ['Marketing de moda', 'Branding para empresas textiles'],
    masteres: [] },

  { slug: 'top-up-diseno-de-moda', nombre: 'Top-up en Diseño de Moda', area: 'diseno-creativo', nivel: 'top-up', dur: 1.5, ects: 90,
    desc: 'Completa tu grado universitario en año y medio si ya tienes un AP o un ciclo de formación superior. Diseño de colecciones y rastreo de tendencias.',
    ramas: [],
    req: req(ingStd, [a('Un AP degree o un CFS en Marketing, Diseño de moda, Innovación o Branding', null, null)]),
    salidas: ['Diseño de colecciones', 'Rastreo de tendencias'],
    masteres: [] },

  { slug: 'top-up-marketing-y-branding-de-moda', nombre: 'Top-up en Marketing y Branding de Moda', area: 'diseno-creativo', nivel: 'top-up', dur: 1.5, ects: 90,
    desc: 'Completa tu grado universitario en año y medio si ya tienes un AP o un ciclo de formación superior. Dirige lanzamientos y campañas para la industria textil.',
    ramas: [],
    req: req(ingStd, [a('Un AP degree o un CFS en Marketing, Diseño de moda, Innovación o Branding', null, null)]),
    salidas: ['Campañas de moda', 'Branding corporativo'],
    masteres: [] },

  { slug: 'top-up-emprendimiento-e-innovacion-de-moda', nombre: 'Top-up en Emprendimiento e Innovación de Moda', area: 'diseno-creativo', nivel: 'top-up', dur: 1.5, ects: 90,
    desc: 'Completa tu grado universitario en año y medio si ya tienes un AP o un ciclo de formación superior. Monta tu propia empresa en el sector de la moda.',
    ramas: [],
    req: req(ingStd, [a('Un AP degree o un CFS en Marketing, Diseño de moda, Innovación o Branding', null, null)]),
    salidas: ['Emprendimiento en moda', 'Marketing para la industria de la moda'],
    masteres: [] },
];

let n = 0;
for (const g of G) {
  const ficha = {
    nombre_oficial: g.nombre,
    nombre_es: g.nombre,
    descripcion: g.desc ?? null,
    universidad: null,
    ciudad: null,
    area: g.area,
    nivel: g.nivel,
    duracion_anios: g.dur,
    ects: g.ects,
    idioma: 'Inglés',
    ramas_especializacion: g.ramas ?? [],
    requisitos: g.req,
    cuota_admision: null,
    comienzo: 'Agosto',
    plazo_solicitud: null,
    salidas_laborales: g.salidas ?? [],
    masteres_afines: g.masteres ?? [],
    url_oficial: null,
    ultima_verificacion: VERIF,
    destacado: false,
  };
  writeFileSync(join(DIR, `${g.slug}.json`), JSON.stringify(ficha, null, 2) + '\n', 'utf8');
  n++;
}
console.log(`Generadas ${n} fichas de grado en src/content/grados/`);
