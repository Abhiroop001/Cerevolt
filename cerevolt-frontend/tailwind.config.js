
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#1f2937",
        cerevoltBlue: "#646cff",
        border: "#d1d5db",
        ring: "#3b82f6",
        primary: "#1a1a1a",
      },
      borderRadius: {
        DEFAULT: "0.625rem",
      },
    },
  },
  plugins: [
    // require("tailwindcss-animate"), // uncomment if installed
  ],
};
