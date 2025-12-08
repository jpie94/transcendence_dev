/** @type {import('tailwindcss').Config} */

// const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // si tu utilises Vite + TS
  ],
//   theme: {
//     extend: {
//       fontFamily: {
// 		pong: ['Pong', 'sans-serif'],
// 		score: ['Score', 'sans-serif'],
//         ps2p: ['PressStart2P', 'monospace'],
//       },
//     },
//   },
//   plugins: [
//     function ({ matchUtilities, theme }) {
//       const flatColors = flattenColorPalette(theme('colors'));

//       matchUtilities(
//         {
//           'text-stroke': (value) => ({
//             '-webkit-text-stroke-width': `${value}`,
//           }),
//           'stroke-color': (value) => ({
//             '-webkit-text-stroke-color': `${value}`,
//           }),
//         },
//         { values: flatColors }
//       );
//     },
//   ],
}
