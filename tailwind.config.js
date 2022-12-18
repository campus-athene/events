/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        violet: "#372649",
      },
    },
    screens: {
      // Use same sizes as default but em instead of px.
      // https://github.com/tailwindlabs/tailwindcss/discussions/8378
      sm: "40em",
      md: "46em",
      lg: "64em",
      xl: "80em",
      "2xl": "96em",
    },
  },
  plugins: [],
};
