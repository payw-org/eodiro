// global title and description
// we can set these on each page vue components
// const modifyHtml = (html) => {
// remove data-n-head="true"
// return html.replace(/data-n-head(=".*?")?(?!-)/g, '')
// }

/**
 * @type {import("@nuxt/types").Configuration}
 */
const config = {
  // custom global id of html dom
  globalName: 'eodiro',

  mode: 'spa',

  // head tags options
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#ffffff' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default'
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png'
      },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ff6421' },
      {
        rel: 'manifest',
        href: '/manifest.webmanifest'
      }
    ]
  },

  // Source directory
  srcDir: 'src/',

  router: {
    // Custom link class names
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    base: '/eodiro.com/'

    // Run middleware when route changes
    // middleware: 'route-change'
  },

  hooks: {
    // 'generate:page': (page) => {
    //   page.html = modifyHtml(page.html)
    // },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // 'render:route': (url, page) => {
    //   page.html = modifyHtml(page.html)
    // }
  },

  // Disable Nuxt.js's loading feature
  loading: false,

  css: [
    '~/assets/styles/css/fonts.css',
    '~/assets/styles/scss/global/globalstyle.scss',
    '~/assets/styles/stylus/spring.styl'
  ],

  plugins: [
    { src: '~/plugins/init.js', mode: 'client' },
    { src: '~/plugins/ga.js', mode: 'client' }
  ],

  buildModules: ['@nuxtjs/eslint-module', '~/modules/nuxt/extend-route'],

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
        detectBrowserLanguage: false
      }
    ],
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-140443623-1'
      }
    ]
  ],

  // Custom build path name
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

export default config
