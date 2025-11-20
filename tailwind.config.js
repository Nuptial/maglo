/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563eb',
          accent: '#38bdf8',
          muted: '#0f172a',
        },
      },
    },
  },
  plugins: [],
}

