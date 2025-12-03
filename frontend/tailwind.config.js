/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#a855f7',
        },
        pink: {
          DEFAULT: '#ec4899',
        },
      },
    },
  },
  plugins: [],
}
