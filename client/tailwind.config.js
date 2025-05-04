/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e6f4ea',        
        secondary: '#34a853',      
        accent: '#1b5e20',         
        
      },
    },
  },
  plugins: [],
}
