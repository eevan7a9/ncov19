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
  modules: ['nuxt-icon','@pinia/nuxt'],
  // disable dev-tools due to errors: https://github.com/nuxt/nuxt/issues/23493
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss'],
  typescript:{
    // have to turn false due to bug
    // https://github.com/nuxt/nuxt/issues/22421
    typeCheck: false
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  imports:{
    dirs: ['stores']
  }
})
