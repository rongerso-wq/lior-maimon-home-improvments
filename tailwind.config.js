/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        violet:  { DEFAULT: '#7C3AED', soft: '#A78BFA', deep: '#6D28D9', faint: '#F5F3FF' },
        amber:   { DEFAULT: '#F59E0B', dark: '#D97706', light: '#FDE68A', faint: '#FFFBEB' },
        night:   { DEFAULT: '#1E1028', mid: '#16082E', deep: '#0A0012' },
        ink:     { DEFAULT: '#0F0B1E', soft: '#888' },
      },
      fontFamily: {
        heebo:  ['Heebo', 'sans-serif'],
        serif:  ['"Frank Ruhl Libre"', 'serif'],
        mono:   ['"Space Mono"', 'monospace'],
      },
      animation: {
        'spin-slow':     'spin 22s linear infinite',
        'spin-slow-rev': 'spin 30s linear infinite reverse',
      },
    },
  },
  plugins: [],
}
