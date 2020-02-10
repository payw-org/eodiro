import EodiroCookie, { defaultCookieOptions } from '~/modules/cookie'
import CookieConfig from '~~/config/cookie'

/**
 * Returns a class name matches to color scheme mode
 * @param {'light'|'dark'|'auto'} colorMode
 */
function getColorClassName(colorMode) {
  let colorSchemeClassName = 'light-mode'

  if (colorMode === 'light') {
    colorSchemeClassName = 'light-mode'
  } else if (colorMode === 'dark') {
    colorSchemeClassName = 'dark-mode'
  } else if (colorMode === 'auto') {
    colorSchemeClassName = 'auto-color-scheme'
  }

  return colorSchemeClassName
}

// states
export const state = () => ({
  colorSchemeClassName: 'light-mode',
  lang: 'en',
  isFirstLoad: true,
  cachedComponents: [],
  routeCache: [],
  currentHamlet: '',
  hamletList: [
    'home',
    'vacant',
    'lectures',
    'clubs',
    'pepero-square',
    'cafeteria',
    'inquiry',
    'donation',
    'opensource',
    'preferences',
    'sign-in',
    'sign-up',
    'forgot',
    'me',
    'privacy',
  ],
  auth: {
    isSignedIn: false,
  },
})

export const mutations = {
  SET_IS_FIRST_LOAD(state, value) {
    state.isFirstLoad = value
  },
  /**
   * @param {'ko'|'en'} lang
   */
  SET_LANG(state, lang) {
    state.lang = lang
  },
  /**
   * @param {'light'|'dark'|'auto'} mode
   * @param {Object} payload
   * @param {string} payload.mode
   * @param {import('http').ServerResponse} payload.res
   */
  SET_COLOR_SCHEME(state, payload) {
    const { mode, res } = payload

    let newMode = mode

    if (!mode) {
      newMode = 'light'
    }

    new EodiroCookie({ res }).set(
      CookieConfig.colorSchemeCookieName,
      newMode,
      defaultCookieOptions
    )

    const colorSchemeClassName = getColorClassName(newMode)
    state.colorSchemeClassName = colorSchemeClassName
  },
  CACHE_ROUTE(state, payload) {
    const { componentName, depth } = payload
    if (componentName === undefined || depth === undefined) {
      console.warn(
        '⚠️ Route cache - insufficient payload data',
        componentName,
        depth
      )
      return
    }

    const existingIndex = state.cachedComponents.indexOf(componentName)
    /** @type {[]} */
    const cachedComponents = state.cachedComponents
    /** @type {[[]]} */
    const routeCache = state.routeCache

    if (existingIndex === -1) {
      if (!routeCache[depth]) {
        routeCache[depth] = []
      }
      cachedComponents.push(componentName)
      routeCache[depth].push(componentName)
    }
  },
  CLEAR_ROUTE(state, payload) {
    const { destinationDepth } = payload
    /** @type {[[]]} */
    const routeCache = state.routeCache
    for (let i = routeCache.length - 1; i > destinationDepth; i -= 1) {
      if (routeCache[i] && routeCache[i].length > 0) {
        for (let j = 0; j < routeCache[i].length; j += 1) {
          const existingIndex = state.cachedComponents.indexOf(routeCache[i][j])
          if (existingIndex !== -1) {
            state.cachedComponents.splice(existingIndex, 1)
          }
        }
      }

      routeCache.pop()
    }
  },
  /**
   * @param {boolean} bool
   */
  SET_SIGNED_IN(state, bool) {
    state.auth.isSignedIn = bool
  },
}

export const actions = {
  nuxtServerInit({ commit, state }, { req, res, redirect, app, route }) {
    // If color scheme is set in cookie
    // initialize vuex store with the value
    const eodiroCookie = new EodiroCookie({ req, res })
    const colorScheme = eodiroCookie.get(CookieConfig.colorSchemeCookieName)

    if (colorScheme) {
      state.colorSchemeClassName = getColorClassName(colorScheme)
    } else {
      commit('SET_COLOR_SCHEME', { res })
      eodiroCookie.pile(
        CookieConfig.colorSchemeCookieName,
        'light',
        defaultCookieOptions
      )
    }

    let lang = eodiroCookie.get(CookieConfig.langCookieName)
      ? eodiroCookie.get(CookieConfig.langCookieName)
      : req.headers['accept-language']
      ? req.headers['accept-language'].slice(0, 2).toLowerCase()
      : 'en'

    // For old lang code compatibility
    // TODO: remove this code when sufficient time had been passed
    if (lang === 'kr') {
      lang = 'ko'
    }

    // Real page language
    const pageLang = app.i18n.locale

    if (lang !== pageLang) {
      app.i18n.setLocale(lang)
    }

    commit('SET_LANG', lang)
    eodiroCookie.pile(CookieConfig.langCookieName, lang, defaultCookieOptions)

    eodiroCookie.bulkSet()
  },
}
