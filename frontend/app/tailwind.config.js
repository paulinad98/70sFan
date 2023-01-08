/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  purge: {
    enabled: true,
    content: [
      "./public/**/*.html",
      "./src/**/*.vue",
      "./src/main.js",
      "../globalComponents/**/*.{js,vue,ts}",
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#16100b",
          100: "#F7CCAC",
          200: "#C69B7B",
          300: "#a5a5a520",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        purple: {
          700: "#A63C06",
          500: "#A63C06",
        },
      },
    },
  },
  plugins: [],
};
