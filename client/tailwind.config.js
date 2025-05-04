/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2e7d32',     // 60% — Deep sustainable green
        secondary: '#a5d6a7',   // 30% — Soft mint green
        accent: '#ffcc80',      // 10% — Warm contrast (like peach/orange)
      },
    },
  },
  plugins: [],
}
