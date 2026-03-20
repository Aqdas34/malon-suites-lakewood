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
        'malon-primary': '#9B804E', // Official Malon Gold Accent Color
        'malon-red': '#e64b50', // Official Malon Header Button Color
        'malon-dark': '#1e1e1e',
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

