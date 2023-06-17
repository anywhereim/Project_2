/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ js,jsx,}'],
  theme: {
    extend: {
      colors: {
        brand: '#6096B4',
      },
      backgroundImage: {
        banner: `url('../public/images/banner.png')`,
      }
    }
  },
  plugins: [],
}

