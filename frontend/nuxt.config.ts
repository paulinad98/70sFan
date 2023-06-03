// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ['~/assets/styles/main.css'],

  runtimeConfig: {
    public: {
      patreonClientId: process.env.PUBLIC_PATREON_CLIENT_ID || '',
      patreonRedirectUri: process.env.PUBLIC_PATREON_REDIRECT_URI || '',
      apiUrl: process.env.PUBLIC_API_URL || '',
      landingUrl: process.env.PUBLIC_LANDING_URL || '',
      apiToken: process.env.PUBLIC_API_TOKEN || '',
      patreonUrl: process.env.PUBLIC_PATREON_URL || '',
    },
  },

  modules: ['@pinia/nuxt'],

  routeRules: {
    '/': { static: true },
    '/home': { ssr: false },
    '/oauth': { ssr: false },
  },

  devtools: {
    enabled: true,
  },
});
