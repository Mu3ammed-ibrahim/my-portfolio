/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0F172A',
          surface: '#1E293B',
          'surface-alt': '#334155',
          cta: '#22C55E',
          'cta-hover': '#16A34A',
          text: '#F8FAFC',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        nippo: ['Nippo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
