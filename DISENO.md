# Identidad de marca · Study & Beyond

Sistema visual del sitio. Si una pantalla nueva no encaja en estas reglas, la
regla se discute antes de inventar una excepción.

## Idea

Editorial nórdico, cálido y optimista. Fondo crema, tipografía enorme y muy
apretada en navy con **una** palabra en coral, azul vivo reservado a la acción
y amarillo como banda de energía. Las superficies de contenido son pasteles
planos con texto navy encima.

## Color

| Token | Valor | Uso |
| --- | --- | --- |
| `crema` | `#F7F3EA` | Fondo principal del sitio |
| `hueso` | `#FBF8F1` | Banda alterna, ligeramente más clara |
| `papel` | `#FFFFFF` | Tarjetas, barras, formularios |
| `navy` | `#0E2148` | Texto, secciones oscuras, pie |
| `azul` | `#1358E0` | Botones primarios, enlaces, estado activo |
| `coral` | `#EE5A44` | Palabra destacada del titular, sellos, marcas de lista |
| `coral-700` | `#BE3A27` | Coral en textos pequeños (pasa AA sobre crema) |
| `amarillo` | `#FFC93D` | Franja de datos, marco desplazado, sellos |
| `cielo` | `#DCE8FC` | Ingenierías y tecnología · bandas de sección |
| `menta` | `#D6EBDD` | Humanidades y sociales |
| `melocoton` | `#FBE0D7` | Diseño y creatividad |
| `lavanda` | `#E6E1F7` | Otras ciencias |
| `mantequilla` | `#FDF3DC` | Negocios y economía |
| `slate` | `#55637F` | Texto secundario |
| `hairline` | `#E5DFD3` | Filetes y bordes |

Reglas:

- El **azul es solo acción**. Si algo es azul, se pulsa (o es un enlace).
- El **coral es acento**, nunca fondo de un bloque de texto largo.
- El **amarillo y el coral llevan siempre texto navy**, nunca blanco. Sobre
  coral, el blanco se queda en 3,45:1 y no pasa AA; el navy da 4,6:1.
- Una familia académica = un color, en todo el sitio (`src/lib/areas.ts`).
- Sobre pastel, el texto secundario baja como mucho a `navy/70`; por debajo
  deja de pasar AA.
- Un bloque nunca lleva el mismo color que la banda que lo contiene: sobre
  `cielo` una tarjeta destacada va en blanco, no en `azul-100`.

## Tipografía

Una sola familia: **Plus Jakarta Sans** (autoalojada, variable 200–800).
**DM Mono** aparece únicamente en datos, numerales de sección y fechas.

| Escala | Uso |
| --- | --- |
| `text-monumento` | Titular de portada |
| `text-seccion` | Titular de sección |
| `text-titulo` | H1 de página interior |
| `text-h2` / `text-h3` | Subtítulos |
| `text-cifra` / `text-numeral` | Cifras como grafismo (0 €, SU, 41) |

Los titulares van siempre en `font-extrabold` con tracking negativo: es la
firma tipográfica de la marca.

## Forma

- Todo lo que se pulsa es una **píldora** (`rounded-full`): botones, chips,
  numerales del itinerario.
- Tarjetas e imágenes: `rounded-tarjeta` (20px) y `rounded-imagen` (24px).
- Sin sombra en reposo; `shadow-flotante` solo al pasar por encima.

## Logotipo

El isotipo son dos eslabones entrelazados que forman una S, en blanco sobre
cuadrado azul redondeado (radio 22 % del lado). Sobre fondo navy se invierte:
cuadrado blanco, eslabones azules. El trazado vive en `src/lib/marca.ts` como
fuente única y lo usan `Marca.astro` y el favicon; el nombre se compone en
Plus Jakarta Sans en dos líneas.

## Elementos firma

- **Sello** (`Sello.astro`): círculo coral o amarillo girado −8°, con texto
  navy, solapando siempre una foto o una composición. Nunca suelto en medio
  del texto, y nunca describiendo el edificio de la foto como nuestra sede.
- **Marco amarillo desplazado**: bloque amarillo detrás de la foto principal,
  movido 12px en diagonal. Solo en el héroe de portada.
- **Franja amarilla**: los datos de un vistazo bajo el héroe.
- **Rótulo de sección** (`.etiqueta`): mayúsculas espaciadas con filete corto
  delante. Sin numerar: las secciones no llevan `01 /`, `02 /`…
- **Itinerario**: números en píldora azul unidos por línea fina; el último paso
  va en coral.

## Bloques informativos

Ni filetes laterales ni cajas con borde de color: un bloque destacado es una
tarjeta blanca con las mismas esquinas que el resto (`rounded-tarjeta`) y el
rótulo arriba en mayúsculas espaciadas. Vale para `.bloque-condicion`,
`.nota` y las citas del contenido MDX.

## Accesibilidad

- Objetivos táctiles de 44–48px de alto mínimo.
- Foco visible: contorno azul de 3px con radio de píldora.
- `prefers-reduced-motion` desactiva la aparición de secciones y el pulso del
  calendario.
- Las combinaciones de la tabla de color están comprobadas para AA en el tamaño
  en el que se usan.
