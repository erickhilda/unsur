import tailwindcss from '@nuxtjs/tailwindcss'
import pinia from '@pinia/nuxt'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    pinia,
    tailwindcss,
    '@tresjs/nuxt',
  ],

  tres: {
    devtools: false,
  },

  css: ['~/assets/css/globals.css'],

  // Tailwind v3 (parity with old app: tailwindcss 3.4 via @nuxtjs/tailwindcss @6)
  tailwindcss: {
    cssPath: '~/assets/css/globals.css',
    configPath: 'tailwind.config.js',
  },

  app: {
    head: {
      title: 'Unsur - Table Periodic of Element',
      htmlAttrs: { lang: 'en' },
      bodyAttrs: {
        class: 'mx-auto bg-background dark',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Periodic Table of Elements built with Nuxt' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  // Static site generation (pariti dengan kebutuhan SSG dari evaluasi)
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/acknowledgment'],
    },
  },
})
