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
  /** @type {string[]} */
  cachedComponents: [],
  routeCache: [],
  /** @type {Record<string, [string[]]>} */
  hamletCachedComponents: {},
  /** @type {string[]} */
  jumpHistory: [],
  currentHamlet: '',
  auth: {
    isSignedIn: false,
  },
})

/**
 * @typedef RootState
 * @type {ReturnType<typeof state>}
 */

/**
 * @type {import('vuex').MutationTree<RootState>}
 */
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
  SET_COLOR_SCHEME(state, colorScheme) {
    state.colorSchemeClassName = colorScheme
  },
  SET_CACHED_COMPONENTS(state, value) {
    state.cachedComponents = value
  },
  SET_HAMLET_CACHED_COMPONENTS(state, value) {
    state.hamletCachedComponents = value
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
  POP_ROUTE(state, payload) {
    const { componentName, depth } = payload
    const cachedComponents = state.cachedComponents
    const routeCache = state.routeCache
    const index = cachedComponents.indexOf(componentName)
    if (index !== -1) {
      cachedComponents.splice(index, 1)

      const index2 = routeCache[depth].indexOf(componentName)
      if (index2 !== -1) {
        routeCache[depth].splice(index2, 1)

        if (routeCache[depth].length === 0) {
          routeCache.splice(depth, 1)
        }
      }
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
  SET_JUMP_HISTORY(state, newHistory) {
    state.jumpHistory = newHistory
  },
}

/**
 * @type {import('vuex').ActionTree<RootState, RootState>}
 */
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
  async setColorScheme({ commit, state }, { res, mode }) {
    let newMode = mode
    if (!newMode) {
      newMode = 'light'
    }

    await new EodiroCookie({ res }).set(
      CookieConfig.colorSchemeCookieName,
      newMode,
      defaultCookieOptions
    )

    const colorSchemeClassName = getColorClassName(newMode)
    commit('SET_COLOR_SCHEME', colorSchemeClassName)
    // state.colorSchemeClassName = colorSchemeClassName
  },
  /**
   * @typedef ComponentCachingPayload
   * @property {string} hamletName
   * @property {string} componentName
   * @property {number} depth
   */
  pushComponent(
    { commit, state },
    /** @type {ComponentCachingPayload} */ payload
  ) {
    const { hamletName, componentName, depth } = payload

    // Check existance
    const i = state.cachedComponents.indexOf(componentName)
    if (i !== -1) {
      return
    }

    // Push to array cached
    const newCachedComponents = [...state.cachedComponents]
    newCachedComponents.push(componentName)
    commit('SET_CACHED_COMPONENTS', newCachedComponents)

    const newHamletCachedComponents = JSON.parse(
      JSON.stringify(state.hamletCachedComponents)
    )

    if (!newHamletCachedComponents[hamletName]) {
      newHamletCachedComponents[hamletName] = []
    }

    if (!newHamletCachedComponents[hamletName][depth]) {
      newHamletCachedComponents[hamletName][depth] = []
    } else if (
      newHamletCachedComponents[hamletName][depth].includes(componentName)
    ) {
      return
    }

    newHamletCachedComponents[hamletName][depth].push(componentName)
    commit('SET_HAMLET_CACHED_COMPONENTS', newHamletCachedComponents)
  },
  popComponent(
    { commit, state },
    /** @type {ComponentCachingPayload} */ payload
  ) {
    const { hamletName, componentName, depth } = payload

    const index = state.cachedComponents.indexOf(componentName)
    if (index === -1) {
      return
    }

    const cachedComponentsClone = [...state.cachedComponents]
    cachedComponentsClone.splice(index, 1)

    commit('SET_CACHED_COMPONENTS', cachedComponentsClone)

    const hamletCachedComponentsClone = JSON.parse(
      JSON.stringify(state.hamletCachedComponents)
    )

    if (!hamletCachedComponentsClone[hamletName]) {
      return
    }

    let i = hamletCachedComponentsClone[hamletName].length
    while ((i -= 1)) {
      hamletCachedComponentsClone[hamletName].pop()
      if (i === depth) {
        break
      }
    }

    // Check emptiness of hamlet entry
    let empty = true
    for (
      let i = 0;
      i < hamletCachedComponentsClone[hamletName].length;
      i += 1
    ) {
      if (hamletCachedComponentsClone[hamletName][i]) {
        empty = false
        break
      }
    }
    if (empty) {
      delete hamletCachedComponentsClone[hamletName]
    }

    commit('SET_HAMLET_CACHED_COMPONENTS', hamletCachedComponentsClone)
  },
  clearComponent({ commit, state }, payload) {
    commit('SET_CACHED_COMPONENTS', [])
    commit('SET_HAMLET_CACHED_COMPONENTS', {})
  },
  pushJump({ commit, state }, /** @type {string} */ routeName) {
    const newHistory = [...state.jumpHistory]
    newHistory.push(routeName)
    commit('SET_JUMP_HISTORY', newHistory)
  },
  popJump({ commit, state }, hamletName) {
    const newHistory = [...state.jumpHistory]
    newHistory.pop()
    commit('SET_JUMP_HISTORY', newHistory)
  },
  clearJump({ commit, state }, hamletName) {
    commit('SET_JUMP_HISTORY', [])

    const hamletCachedComponentsClone = JSON.parse(
      JSON.stringify(state.hamletCachedComponents)
    )
    const cachedComponentsClone = [...state.cachedComponents]
    Object.keys(hamletCachedComponentsClone).forEach((key) => {
      if (key !== hamletName && key !== 'home') {
        hamletCachedComponentsClone[key].forEach((componentNameArr) => {
          if (componentNameArr) {
            componentNameArr.forEach((componentName) => {
              const index = cachedComponentsClone.indexOf(componentName)
              if (index !== -1) {
                cachedComponentsClone.splice(index, 1)
              }
            })
          }
        })
        delete hamletCachedComponentsClone[key]
      }
    })
    commit('SET_CACHED_COMPONENTS', cachedComponentsClone)
    commit('SET_HAMLET_CACHED_COMPONENTS', hamletCachedComponentsClone)
  },
}
