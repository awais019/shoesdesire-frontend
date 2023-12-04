// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@formkit/nuxt", "@vueuse/nuxt"],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
    },
  },
});
