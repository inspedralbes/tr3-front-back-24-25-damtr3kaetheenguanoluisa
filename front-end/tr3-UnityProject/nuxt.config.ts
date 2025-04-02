// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  ssr: true,
  nitro: {
    preset: 'node-server'
  },
  devtools: { enabled: false },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    baseURL: '/'
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
  runtimeConfig: {
    public: {
      apiBase: 'https://dam.inspedralbes.cat:22200'
    }
  },

  compatibilityDate: '2025-04-02'
})