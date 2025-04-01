// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  hooks: {
    'pages:extend'(pages) {
      // Hacer que /login sea la página por defecto
      pages.push({
        name: 'index',
        path: '/',
        redirect: '/login'
      })
    }
  },

  compatibilityDate: '2025-04-02'
})