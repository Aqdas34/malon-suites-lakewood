/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'malon-cream': '#FBF6E8',
        'malon-gold': '#9B804E',
        'malon-accent': '#8E7047',
        'malon-dark': '#000000',
        'malon-gray': '#3D3931',
      },
      fontFamily: {
        lora: ['"Lora"', 'serif'],
        forum: ['"Forum"', 'serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

