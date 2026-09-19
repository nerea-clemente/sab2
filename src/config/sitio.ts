// Constantes compartidas del sitio. Un solo sitio donde editar datos de marca.
// Los datos marcados TODO están pendientes de confirmar (ver PENDIENTE.md).

export const SITIO = {
  nombre: 'Study and Beyond',
  // Entidad legal: empresa DANESA (ApS), no española. Ver PENDIENTE.md.
  entidadLegal: 'Study and Beyond ApS',
  cvr: '43172794',
  // La empresa está cerrada y pendiente de reabrir: mientras esto sea false,
  // el CVR no aparece en ninguna parte del sitio (pie, aviso legal,
  // privacidad, contacto, sobre nosotros ni datos estructurados).
  // Para volver a publicarlo, basta con ponerlo en true.
  mostrarCvr: false,
  // Domicilio social. Solo se publica en las páginas legales, donde es
  // obligatorio identificar a la empresa; el resto del sitio dice "Dinamarca".
  domicilio: 'Agerbeaksvej 32, 1. 2., 8240 Risskov (Aarhus), Dinamarca',
  // Fecha que se muestra en las páginas legales.
  legalActualizado: 'Septiembre de 2026',
  dominio: 'https://studyandbeyond.es',
  descripcion:
    'Orientación y gestión completa para estudiar un grado en Dinamarca: admisión, alojamiento y acompañamiento en el país.',
  telefono: '+34 635 369 915',
  telefonoPlano: '635369915',
  email: 'info@studyandbeyond.es',
  // Precio actual del servicio (confirmado por el cliente, 2026-08).
  precioServicio: 1900,
  // Beca SU: cifra vigente. Presentar SIEMPRE con su condición.
  suImporteMensualDKK: 7426,
  // Equivalente aproximado en euros, la cifra que se muestra en portada.
  suImporteMensualEUR: 990,
  pais: 'Dinamarca',
  anioFundacion: 2020,
  // Analítica respetuosa (sin cookies). Mientras esté deshabilitada, el sitio
  // no carga scripts de terceros ni muestra banner (no hay nada que consentir).
  // Al configurar Plausible, poner habilitada: true. Ver README.
  analitica: {
    habilitada: false,
    dominio: 'studyandbeyond.es',
    script: 'https://plausible.io/js/script.js',
  },
} as const;

// Navegación principal.
export const NAV = [
  { texto: 'Grados', href: '/grados/' },
  {
    texto: 'Estudiar en Dinamarca',
    href: '/estudiar-en-dinamarca/',
    hijos: [
      { texto: 'Guías', href: '/estudiar-en-dinamarca/' },
      { texto: 'Para estudiantes', href: '/para-estudiantes/' },
      { texto: 'Para familias', href: '/para-familias/' },
    ],
  },
  { texto: 'Servicios', href: '/servicios/' },
  { texto: 'Blog', href: '/blog/' },
  // Historias: oculta por ahora. Para volver a publicarla, descomentar esta
  // línea, la sección de la portada y quitar el noindex de la página.
  // { texto: 'Historias', href: '/historias/' },
  { texto: 'Sobre nosotros', href: '/sobre-mi/' },
] as const;

// Enlaces solo en el pie.
export const NAV_PIE = [
  { texto: 'Contacto', href: '/contacto/' },
] as const;

// Lista plana de la navegación, para el pie.
export const NAV_PLANA = NAV.flatMap((i) =>
  'hijos' in i ? [...i.hijos] : [{ texto: i.texto, href: i.href }],
);
