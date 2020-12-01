import { siteHead } from './packages/basis/scripts/head'

require('dotenv').config()

const isProduction = process.env.APP_ENV === 'production'
const isStage = process.env.APP_ENV === 'stage'
const isDevelopment = process.env.NODE_ENV === 'development'
const baseColor = '#E33737'
export default {
  ssr: process.env.IS_SSR === 'true',
  server: {
    port: process.env.PORT || '4444',
    host: process.env.BASE_URL || '0.0.0.0',
  },
  appTemplatePath: isProduction
    ? 'app.production.html'
    : 'app.development.html',
  store: true,
  head: siteHead({
    color: baseColor,
    title: 'Test',
    // links: [{
    //   rel: 'stylesheet',
    //   href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap'
    // }]
  }),

  loading: {
    color: baseColor,
  },
  css: [{src: '~assets/styles/styles.styl', lang: 'styl'}],
  styleResources: {
    stylus: [
      '~assets/styles/global/vars.styl',
      '~assets/styles/global/mixins.styl',
    ],
  },
  plugins: [
    {
      src: '~/plugins/basis.js',
      ssr: true,
    },
    {
      src: '~/plugins/vue-inline-svg.js',
      ssr: false,
    },
    {
      src: '~plugins/lazysizes.client.js',
      ssr: false,
    },
  ],
  buildModules: ['@nuxtjs/eslint-module'],
  modules: [
    'cookie-universal-nuxt',
    'nuxt-user-agent',
    'nuxt-polyfill',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/apollo',
  ],
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js',
    },
    // includeNodeModules: true,
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    watchLoading: '~/plugins/apollo-watch-loading-handler.js',
    errorHandler: '~/plugins/apollo-error-handler.js',
  },
  svgSprite: {
    input: '~/assets/svg/',
  },
  middleware: [''],
  axios: {},
  storybook: {
    // Options
    port: 4000,
  },
  cache: true,
  modern: isStage || isProduction,
  build: {
    extractCSS: isStage || isProduction,
    extend(config, ctx, isServer) {
      if (ctx.isClient) {
        ctx.loaders.vue.transformAssetUrls.img = ['data-src', 'src']
        ctx.loaders.vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }
      if (ctx.isClient) {
        config.devtool = isDevelopment ? '#source-map' : ''
      }
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        })
      }
    },
    transpile: ['v-body-scroll-lock', 'body-scroll-lock'],
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: {
                version: 3,
              },
            },
          ],
        ]
      },
    },
  },
  polyfill: {
    features: [
      {
        require: 'smoothscroll-polyfill',
        detect: () =>
          'scrollBehavior' in document.documentElement.style &&
          window.__forceSmoothScrollPolyfill__ !== true,
        install: (smoothscroll) => smoothscroll.polyfill(),
      },
      {
        require: '@ungap/global-this',
        detect: () => typeof globalThis === 'object',
      },
    ],
  },
}
