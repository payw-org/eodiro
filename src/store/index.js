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
  routeMap: null,
  historyStack: []
})

export const mutations = {
  /**
   * @param {'light'|'dark'|'auto'} mode
   */
  setColorScheme(state, mode) {
    JSCookie.set('color_scheme', mode, { expires: 99999 })
    let colorSchemeClassName = getColorClassName(mode)
    state.colorSchemeClassName = colorSchemeClassName
  },
  /**
   * @param {string} pageName
   */
  pushHistory(state, pageName) {
    state.historyStack.push(pageName)
    if (state.historyStack.length > 500) {
      historyStack.shift()
    }
  }
}

export const actions = {
  /**
   * Runs on server at first
   */
  nuxtServerInit({ commit, state }, { req }) {
    const cookies =
      req.headers && req.headers.cookie ? Cookie.parse(req.headers.cookie) : {}
    const mode = cookies['color_scheme']

    commit('setColorScheme', mode)

    // set routeMap
    state.routeMap = {
      vacant: [
        'index',
        'vacant',
        'vacant-buildingId',
        'vacant-buildingId-floorId'
      ],
      preferences: ['index', 'preferences']
    }
  }
}

export const getters = {
  // get previous route from routeMap
  getPreviousRoute: state => (routeName, currentRoute) => {
    currentRoute = currentRoute.replace(/___[a-z][a-z]/g, '')

    if (routeName === 'index') {
      return null
    } else {
      return state.routeMap[routeName][
        state.routeMap[routeName].indexOf(currentRoute) - 1
      ]
    }
  },
  // get previous path name from historyStack
  getPreviousPathName(state) {
    let path = state.historyStack[state.historyStack.length - 2]
    return path
  }
}
