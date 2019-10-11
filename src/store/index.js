import Cookie from 'cookie'
import JSCookie from 'js-cookie'

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
  cachedComponents: [],
  hamletList: [
    'home',
    'vacant',
    'search-class',
    'clubs',
    'square',
    'meals',
    'inquiry',
    'donation',
    'opensource',
    'preferences'
  ]
})

export const mutations = {
  /**
   * @param {'light'|'dark'|'auto'} mode
   */
  SET_COLOR_SCHEME(state, mode) {
    JSCookie.set('color_scheme', mode, { expires: 99999 })
    const colorSchemeClassName = getColorClassName(mode)
    state.colorSchemeClassName = colorSchemeClassName
  },
  CACHE_COMPONENT(state, componentName) {
    const index = state.cachedComponents.indexOf(componentName)
    if (index === -1) {
      state.cachedComponents.push(componentName)
    }
  },
  POP_COMPONENT(state, componentName) {
    const index = state.cachedComponents.indexOf(componentName)
    if (index !== -1) {
      state.cachedComponents.splice(index, 1)
    }
  },
  setRouteDirection(state, direction) {
    state.routeDirection = direction
  }
}

export const actions = {
  /**
   * Runs on server at first
   */
  nuxtServerInit({ commit }, { req }) {
    // set color scheme using cookie
    const cookies =
      req.headers && req.headers.cookie ? Cookie.parse(req.headers.cookie) : {}
    const mode = cookies.color_scheme

    commit('SET_COLOR_SCHEME', mode)
  }
}
