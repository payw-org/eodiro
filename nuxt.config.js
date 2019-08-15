// global title and description
// we can set these on each page vue components
const modifyHtml = (html) => {
  // remove data-n-head="true"
  return html.replace(/data-n-head(=".*?")?(?!-)/g, '')
}

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

  // source directory ('/src')
  srcDir: 'src',

  router: {
    // custom link class names
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',

    // run middleware when route changes
    middleware: 'route-change',

    // customize scroll behaviour
    // scroll to top when route forward
    // scroll to stored position when route backward
    // if there is no stored position, scroll to top
    scrollBehavior (to, from, savedPosition) {
      // tweak nuxt.js' default method
      return new Promise((resolve) => {
        const lastScrollPosition =
          to.matched &&
          to.matched[to.matched.length - 1] &&
          to.matched[to.matched.length - 1].components &&
          to.matched[to.matched.length - 1].components.default &&
          to.matched[to.matched.length - 1].components.default.options &&
          to.matched[to.matched.length - 1].components.default.options.meta &&
          to.matched[to.matched.length - 1].components.default.options.meta
            .lastScrollPosition
            ? to.matched[to.matched.length - 1].components.default.options.meta
              .lastScrollPosition
            : 0

        const position = {
          x: 0,
          y: lastScrollPosition
        }

        // wait for the out transition to complete
        window.$nuxt.$once('triggerScroll', () => {
          resolve(position)
        })
      })
    }
  },

  hooks: {
    'generate:page': (page) => {
      page.html = modifyHtml(page.html)
    },
    'render:route': (url, page, { req, res }) => {
      page.html = modifyHtml(page.html)
    }
  },

  // not using nuxt's loading feature
  loading: false,

  // include global css/scss files
  css: [
    '~/assets/styles/css/fonts.css',
    '~/plugins/eodiro-dialog/style.scss',
    '~/assets/styles/scss/global/globalstyle.scss',
    '~/assets/styles/stylus/spring.styl'
  ],

  // plugins
  plugins: ['~/plugins/init.ts'],

  // devModules
  devModules: [
    '@nuxtjs/eslint-module'
  ],

  // modules
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
    ]
  ],

  // GA
  googleAnalytics: {
    id: 'UA-140443623-1',
    dev: false
  },

  // transition between routes
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },

  // custom build path name
  build: {
    publicPath: '/dist/',
    postcss: {
      plugins: {
        autoprefixer: {}
      }
    },
    extend (config) {
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
