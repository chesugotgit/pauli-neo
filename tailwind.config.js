/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ['Comfortaa', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        'source-code': ['"Source Code Pro"', 'monospace'],
      },
      colors: {
        bgPrimary: "#B5D1BF", // Primary Background Color
        bgSecondary: "#005A48", // Secondary Background Color
        hoverPrimary: "#A8D5BA", // Primary Hover Color
        offwhite: "#F2F2F2", // Off White
        softsage: "#A0BFA7", // Soft Sage
        deepemerald: "#004D40", // Deep Emerald
        tealgreen: "#007566", // Teal Green
        mintgreen: "#A8D5BA", // Mint Green
        paleteal: "#8FC1A9", // Pale Teal
        goldenrod: "#FFC107", // Goldenrod
        ivory: "#F8F1E5", // Soft Ivory
        forest: "#00695C", // Forest Green
        gold: "#D4A419", // Muted Gold
        mediumgray: "#374151", // Medium Gray
        graphite: "#121212", // Dark Gray (background)
        slate: "#2D2D2D", // Lighter gray for sections
        steel: "#5E807F", // Cool-toned highlight
        charcoal: "#1B1B1B", // Deep shadow tone
      }
    },
  },
  plugins: [],
};
