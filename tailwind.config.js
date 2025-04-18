/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'green': {
          600: '#047857', // WCAG AA compliant
        },
        'red': {
          600: '#b91c1c', // WCAG AA compliant
        },
        'footer': {
          link: '#e5e7eb', // WCAG AA compliant
        }
      },
    },
  },
  plugins: [],
} 