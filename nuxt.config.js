// global title and description
// we can set these on each page vue components
// const modifyHtml = (html) => {
//   // remove data-n-head="true"
//   return html.replace(/data-n-head(=".*?")?(?!-)/g, '')
// }

export default {
  // custom global id of html dom
  globalName: 'eodiro',

  mode: 'universal', // SSR + CSR (hybrid)

  // head tags options
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        property: 'og:image',
        content: 'https://eodiro.com/assets/images/open-graph/open_graph.png'
      }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
    ]
  },

  // Source directory
  srcDir: 'src/',

  router: {
    // Custom link class names
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link'

    // Run middleware when route changes
    // middleware: 'route-change'
  },

  hooks: {
    // 'generate:page': (page) => {
    //   page.html = modifyHtml(page.html)
    // },
    // 'render:route': (url, page, { req, res }) => {
    //   page.html = modifyHtml(page.html)
    // }
  },

  // Disable Nuxt.js's loading feature
  loading: false,

  css: [
    '~/assets/styles/css/fonts.css',
    '~/plugins/eodiro-dialog/style.scss',
    '~/assets/styles/scss/global/globalstyle.scss',
    '~/assets/styles/stylus/spring.styl'
  ],

  plugins: ['~/plugins/init.ts', { src: '~/plugins/ga.js', ssr: false }],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    '~/modules/extend-route'
  ],

  // Nuxt.js modules
  modules: [
    [
      'nuxt-i18n',
      {
        locales: [
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            file: 'en-US.js'
          },
          {
            name: 'Korean',
            code: 'kr',
            iso: 'ko-KR',
            file: 'ko-KR.js'
          }
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'kr',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_lang'
        }
      }
    ],
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-140443623-1'
      }
    ],
    '@nuxtjs/pwa'
  ],

  // custom build path name
  build: {
    publicPath: '/dist/',
    postcss: {
      plugins: {
        autoprefixer: {}
      }
    },
    extend(config) {
      config.module.rules.push({
        // use html-loader for
        // loading templates inside js/ts
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      })
    }
  }
}
