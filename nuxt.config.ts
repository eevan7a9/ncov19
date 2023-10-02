// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    storage: {
      myFileSystem: {
        driver: 'fs',
        base: 'assets/server/',
      }
    }
  },
  modules: ['nuxt-icon'],
  // disable dev-tools due to errors: https://github.com/nuxt/nuxt/issues/23493
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  typescript:{
    typeCheck: true
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
