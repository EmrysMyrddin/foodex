/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx" || "./src/**/**/*.jsx"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
