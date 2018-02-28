const webpack = require('webpack');
// const bodyParser = require('body-parser');
// const session = require('express-session');

module.exports = {
  head: {
    title: 'vue-tunes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'First foray into Vue.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
    ],
    script: [],
  },
  loading: { color: '#3B8070' },
  css: [
    'vuetify/dist/vuetify.min.css',
    '~/assets/css/reset.css',
    '~/assets/css/colors.css',
    '~/assets/css/main.css',
  ],
  plugins: [
    '~/plugins/vuetify',
    '~/plugins/filters',
  ],
  env: {
    baseUrl: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'http://vue.alexbonine.com',
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'axios',
      '~/plugins/vuetify.js',
    ],
  },
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  // serverMiddleware: [
  //   bodyParser.json(),
  //   session({
  //     secret: 'super-secret-key',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 60000 },
  //   }),
  //   '~/api',
  // ]
}
