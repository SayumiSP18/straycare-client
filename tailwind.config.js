/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Golden retriever coat
        golden: {
          50: "#FFF8E7", 100: "#FBEBC0", 200: "#F5D88A", 300: "#EEC25A",
          400: "#E3AA3A", 500: "#D4922A", 600: "#B3741F", 700: "#8A5719",
        },
        cream: "#FDFAF3",
        // Charcoal / grey (Labrador, tabby, black cat)
        ink: {
          50: "#F6F5F2", 100: "#EDEBE5", 200: "#DAD7CF", 400: "#9A9A9F",
          500: "#6B6B72", 700: "#3A3A3F", 900: "#232326",
        },
      },
      fontFamily: {
  display: ['"Lilita One"', "cursive"],
  script: ["Pacifico", "cursive"],
  sans: ["Fredoka", '"Noto Sans Sinhala"', "system-ui", "sans-serif"],
},
      boxShadow: { soft: "0 8px 30px -12px rgba(35,35,38,0.25)" },
    },
  },
  plugins: [],
};
