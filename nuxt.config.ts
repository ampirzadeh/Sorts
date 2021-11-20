import { NuxtConfig } from '@nuxt/types'

export default {
  ssr: false,
  target: 'static',
  head: {
    title: 'Sort',
    htmlAttrs: {
      lang: 'en',
    },
    bodyAttrs: {
      class: process.env.NODE_ENV === 'development' ? 'debug-screens' : '',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Sort visualization by github.com/ampirzadeh',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  modules: [],
  build: {},
} as NuxtConfig
