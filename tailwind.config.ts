import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d9f0ff',
          200: '#bde6ff',
          300: '#8fd7ff',
          400: '#52c2ff',
          500: '#1aa6ff',
          600: '#0786e6',
          700: '#0669b4',
          800: '#08588f',
          900: '#0c4a6e'
        }
      }
    }
  },
  plugins: []
} satisfies Config
