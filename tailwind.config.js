/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwind-scrollbar');

module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
    theme: {
    extend: {
      scrollbar: ['rounded'],
    },
  },
  plugins: [require('@tailwindcss/typography'),
    plugin,
  ],
}

