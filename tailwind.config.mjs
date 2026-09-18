/** @type {import('tailwindcss').Config} */
// ---------------------------------------------------------------------------
// Tokens de marca de Study & Beyond — identidad 2026.
//
// Dirección: editorial nórdica, cálida y optimista. Fondo crema, tipografía
// enorme y muy apretada en navy con una palabra en coral, azul vivo para la
// acción y amarillo como banda de energía. Las superficies de contenido son
// pasteles planos con texto navy encima (todos pasan AA).
//
// Tipografía: Plus Jakarta Sans (geométrica-humanista, autoalojada) para
// titulares y texto; DM Mono solo para datos, numerales de sección y fechas.
// ---------------------------------------------------------------------------
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // ---- Estructura -----------------------------------------------------
        // Navy: texto, secciones oscuras y pie.
        navy: { DEFAULT: '#0E2148', 900: '#081533', 800: '#0B1B3C' },
        ink: { DEFAULT: '#0E2148', 900: '#081533' },
        // Crema: fondo principal del sitio. Papel: tarjetas y barras.
        crema: '#F7F3EA',
        hueso: '#FBF8F1',
        papel: '#FFFFFF',
        paper: '#FFFFFF',

        // ---- Acción ---------------------------------------------------------
        // Azul de marca: botones primarios, enlaces y estado activo.
        azul: { DEFAULT: '#1358E0', 700: '#0F45B0', 300: '#9EBDF6', 100: '#DCE8FC' },

        // ---- Acento ---------------------------------------------------------
        // Coral: palabra destacada del titular, sellos y marcas de lista.
        // El 700 es el que se usa en textos pequeños (pasa AA sobre crema).
        coral: { DEFAULT: '#EE5A44', 700: '#BE3A27', 300: '#FBBBAE', 100: '#FDEAE4' },

        // Amarillo: banda de energía, marcos desplazados y sellos circulares.
        // Siempre con texto navy encima, nunca blanco.
        amarillo: { DEFAULT: '#FFC93D', 300: '#FFE49A', 100: '#FFF4D6' },

        // ---- Superficies de contenido (pasteles) ----------------------------
        // Una familia académica, un color, en todo el sitio.
        cielo: { DEFAULT: '#DCE8FC', 700: '#0F45B0' },   // ingenierías y tecnología
        menta: '#D6EBDD',                                 // humanidades y sociales
        melocoton: '#FBE0D7',                             // diseño y creatividad
        lavanda: '#E6E1F7',                               // otras ciencias
        mantequilla: '#FDF3DC',                           // negocios y economía

        // ---- Texto y filetes ------------------------------------------------
        slate: { DEFAULT: '#55637F', 400: '#8792A8' },
        hairline: '#E5DFD3',
        linea: '#E5DFD3',
      },

      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },

      fontSize: {
        // Titular de portada: monumental y muy apretado.
        monumento: ['clamp(2.75rem, 7.6vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        // Titular de sección: el tamaño que más se repite en el sitio.
        seccion: ['clamp(2rem, 4.6vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        // Título de página interior.
        titulo: ['clamp(1.9rem, 4vw, 3.1rem)', { lineHeight: '1.04', letterSpacing: '-0.028em' }],
        h2: ['clamp(1.6rem, 2.8vw, 2.4rem)', { lineHeight: '1.08', letterSpacing: '-0.022em' }],
        h3: ['clamp(1.15rem, 1.6vw, 1.45rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        // Cifras como grafismo.
        cifra: ['clamp(2.5rem, 5.5vw, 4.25rem)', { lineHeight: '0.9', letterSpacing: '-0.035em' }],
        numeral: ['clamp(4rem, 13vw, 10rem)', { lineHeight: '0.82', letterSpacing: '-0.05em' }],
        display: ['clamp(1.6rem, 2.8vw, 2.4rem)', { lineHeight: '1.08', letterSpacing: '-0.022em' }],
      },

      maxWidth: {
        prosa: '64ch',
        contenido: '1240px',
      },

      // Formas de la marca: píldora en la acción, tarjetas muy redondeadas.
      borderRadius: {
        DEFAULT: '0.625rem',
        xl: '1rem',
        '2xl': '1.25rem',
        tarjeta: '20px',
        imagen: '24px',
        blanda: '20px',
      },

      boxShadow: {
        // Sin sombra en reposo; solo al pasar por encima.
        flotante: '0 18px 40px -18px rgba(14, 33, 72, 0.28)',
        tarjeta: '0 1px 0 rgba(14, 33, 72, 0.04)',
      },

      keyframes: {
        pulso: {
          '0%,100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.16)', opacity: '0.85' },
        },
      },
      animation: {
        pulso: 'pulso 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
