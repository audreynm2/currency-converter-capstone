/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cosmicPurple: "#6b21a8",
        cosmicIndigo: "#4f46e5",
        cosmicBlack: "#0f172a",
      },
      animation: {
        pulseSlow: "pulse 2s ease-in-out infinite",
      }
    },
  },
  plugins: [],
};
