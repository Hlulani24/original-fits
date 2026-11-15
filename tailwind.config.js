/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F1F19",
        coal: "#18291F",
        paper: "#F2ECDF",
        cream: "#F2ECDF",
        sand: "#E5DBC6",
        emerald: "#0E3B2E",
        pine: "#072A20",
        brass: "#B88A3E",
        rust: "#A8452B",
        // Admin panel tokens (dark UI, brass accent)
        bone: "#F2ECDF",
        sun: "#D9AE5F",
        flame: "#E8935A",
        mint: "#7DF0B0",
        ruby: "#D7263D",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"DM Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
