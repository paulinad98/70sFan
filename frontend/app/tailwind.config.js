/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  purge: {
    enabled: true,
    content: ["./public/**/*.html", "./src/**/*.vue", "./src/main.js"],
    // ...
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
