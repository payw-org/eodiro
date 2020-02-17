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

  mode: 'universal',

  // head tags options
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#ffffff' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default',
      },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon-180.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/apple-touch-icon-152.png',
      },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ff6421' },
      {
        rel: 'manifest',
        href: '/manifest.webmanifest',
      },
    ],
  },

  // Source directory
  srcDir: 'src/',

  router: {
    // Custom link class names
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    // base: '/eodiro/'

    // Run middleware when route changes
    // middleware: 'route-change'
  },

  hooks: {
    // 'generate:page': (page) => {
    //   page.html = modifyHtml(page.html)
    // },
    // 'render:route': (url, page) => {
    //   page.html = modifyHtml(page.html)
    // }
  },

  // Disable Nuxt.js's loading feature
  loading: false,

  css: [
    '~/assets/styles/css/fonts.css',
    '~/assets/styles/scss/global/globalstyle.scss',
    '~/assets/styles/stylus/spring.styl',
  ],

  plugins: [
    { src: '~/plugins/init' },
    { src: '~/plugins/ga', mode: 'client' },
    '~/plugins/vue-composition-api',
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
            file: 'en-US.js',
          },
          {
            name: 'Korean',
            code: 'ko',
            iso: 'ko-KR',
            file: 'ko-KR.js',
          },
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'ko',
        detectBrowserLanguage: false,
      },
    ],
  ],

  serverMiddleware: [
    {
      path: '/api/set-cookie',
      handler: '~/api/set-cookie.js',
    },
  ],

  // Custom build path name
  build: {
    publicPath: '/dist/',
    postcss: {
      plugins: {
        autoprefixer: {},
      },
    },
    babel: {
      babelrc: true,
    },
    extend(config) {
      config.module.rules.push({
        // use html-loader for
        // loading templates inside js/ts
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        },
      })
    },
  },
}

export default config
