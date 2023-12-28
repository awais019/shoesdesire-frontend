/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],

  theme: {
    extend: {
      colors: {
        palatinate_blue: "#3047EC",
        anti_flash: "#F2F2F2",
      },
      boxShadow: {
        chat: "0px 1px 6px rgba(0, 0, 0, 0.06), 0px 2px 32px rgba(0, 0, 0, 0.16);",
        conversation:
          "5px 14px 80px 0px rgba(26, 26, 26, 0.12), 10px 10px 40px 0px rgba(0, 0, 0, 0.08);",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
