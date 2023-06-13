/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,svelte}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
