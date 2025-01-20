// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    storage: {
      myFileSystem: {
        driver: "fs",
        base: "assets/server/",
      },
    },
  },

  modules: ["nuxt-icon", "@pinia/nuxt", "@nuxt/image"],

  // disable dev-tools due to errors: https://github.com/nuxt/nuxt/issues/23493
  devtools: { enabled: true },

  css: ["~/assets/css/main.scss"],

  typescript: {
    // have to turn false due to bug
    // https://github.com/nuxt/nuxt/issues/22421
    typeCheck: false,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  imports: {
    dirs: ["stores"],
  },

  compatibilityDate: "2025-01-16",
  runtimeConfig: {
    public: {
      APP_NAME: process.env.APP_NAME,
      NUXT_API_CDC_URL: process.env.NUXT_API_CDC_URL,
      NUXT_API_HEALTH_GOV_URL: process.env.NUXT_API_HEALTH_GOV_URL,
    },
  },
});
