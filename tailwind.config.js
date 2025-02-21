/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ['Comfortaa'],
        inter: ['Inter', 'sans-serif'],
        'source-code': ['Source Code Pro', 'monospace'],
      },
      colors: {
        bgPrimary: "#B5D1BF", // Primary Background Color
        bgSecondary: "#005A48", // Secondary Background Color
        hoverPrimary: "#B9EDCE", // Primary Hover Color
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
      },
      scale: {
        '101': '1.01',
        '102': '1.02',
        '103': '1.03',
        '104': '1.04'
      }
    },
    animation: {
      'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'pulse-medium': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    }
  },
  plugins: [],
};
