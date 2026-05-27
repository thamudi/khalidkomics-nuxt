// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    name: 'Khalid Komics',
  },
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
    '@nuxt/image',
    'nuxt-swiper',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  apiParty: {
    endpoints: {
      cms: {
        url: process.env.NUXT_API_PARTY_ENDPOINTS_CMS_URL!,
      },
    },
    allowClient: true,
  },

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
        language: 'en',
        dir: 'ltr',
        file: 'en.json',
      },
      {
        code: 'ar',
        name: 'العربية',
        language: 'ar',
        dir: 'rtl',
        file: 'ar.json',
      },
    ],
    langDir: 'lang',
    defaultLocale: 'en',
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000/',
    debug: false,
  },

  runtimeConfig: {
    smtpEmail: '',
    smtpPass: '',
    sendgridApiKey: '',
    mailTo: '',
    nodeEnv: '',
    public: {
      nodeEnv: '',
      sendgridApiKey: '',
      siteUrl: '',
    },
  },

  image: {
    domains: (process.env.NUXT_IMAGE_DOMAINS || '').split(',').filter(Boolean),
  },

  typescript: {
    shim: false,
  },
})
