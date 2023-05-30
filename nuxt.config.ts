// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },
  modules: [
    'nuxt-api-party',
    '@nuxtjs/html-validator',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
  ],

  css: [
    '~/assets/css/fonts/typography.css',
    '~/assets/css/global.css',
    // '~/assets/css/typography.css',
    // '~/assets/css/layout.css',
  ],

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en',
        dir: 'ltr',
        file: 'en.json',
      },
      {
        code: 'ar',
        name: 'العربية',
        iso: 'ar',
        dir: 'rtl',
        file: 'ar.json',
      },
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'en',
    baseUrl: 'http://localhost:3000/',
    debug: false,
  },

  runtimeConfig: {
    apiParty: {
      endpoints: {
        cms: {
          url: '',
        },
      },
    },
  },

  typescript: {
    shim: false,
  },
})
