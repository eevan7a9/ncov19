/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    screens: {
      xs: "420px",
      // => @media (min-width: 420px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "1280px",
      // => @media (min-width: 1280px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }

      xl: "1919px",
      // => @media (min-width: 1919px) { ... }
    },

    extend: {},
  },
  plugins: [],
};
