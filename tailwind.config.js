/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        sc: 'hsl(172, 67%, 45%)',
        vdc: 'hsl(183, 100%, 15%)',
        dgc: 'hsl(186, 14%, 43%)',
        gc: 'hsl(184, 14%, 56%)',
        lgc: 'hsl(185, 41%, 84%)',
        vlgc: 'hsl(189, 41%, 97%)',
        w: 'hsl(0, 0%, 100%)'
      },
      fontFamily: {
        sans: 'Space Mono',
        serif: 'Helvetica'
      }
    },
  },
  plugins: [],
}

