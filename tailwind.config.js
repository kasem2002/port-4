/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#D85A30',
          orangeSoft: '#E87A55',
          orangeDeep: '#B8451E',
          green: '#47704C',
          greenSoft: '#6A9070',
          greenDeep: '#365739',
        },
        ink: {
          950: '#0F0E0C',
          900: '#1A1815',
          800: '#26231F',
          700: '#3A3630',
          600: '#57524A',
          500: '#77716A',
          400: '#9A948B',
          300: '#BDB7AE',
        },
        paper: {
          50: '#FBF8F3',
          100: '#F5F0E8',
          200: '#EDE6DA',
          300: '#E2D9C9',
          400: '#D2C7B4',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter2: '-0.03em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,14,12,0.04), 0 8px 24px -12px rgba(15,14,12,0.10)',
        panel: '0 20px 60px -30px rgba(15,14,12,0.25)',
      },
      backgroundImage: {
        'grid-ink':
          'linear-gradient(to right, rgba(26,24,21,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,24,21,0.06) 1px, transparent 1px)',
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.1  0 0 0 0 0.09  0 0 0 0 0.08  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.2 },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        blink: 'blink 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
