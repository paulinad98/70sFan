// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/styles/main.css"],
  runtimeConfig: {
    public: {
      patreonClientId: process.env.PUBLIC_PATREON_CLIENT_ID || "",
      patreonRedirectUri: process.env.PUBLIC_PATREON_REDIRECT_URI || "",
    },
  },
  modules: ["@pinia/nuxt"],
});
