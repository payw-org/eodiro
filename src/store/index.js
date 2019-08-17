import Cookie from 'cookie'
import JSCookie from 'js-cookie'

const routeMap = {
  home: ['index'],
  vacant: ['index', 'vacant', 'vacant-buildingId', 'vacant-buildingId-floorId'],
  preferences: ['index', 'preferences'],
  inquiry: ['index', 'inquiry'],
  searchClass: ['index', 'search-class'],
  clubs: ['index', 'clubs', 'clubs-topic', 'clubs-topic-clubId']
}

/**
 * Returns a class name matches to color scheme mode
 * @param {'light'|'dark'|'auto'} colorMode
 */
function getColorClassName (colorMode) {
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
  lastScrollPosition: 0,
  routeMap,
  prevPath: '',
  historyStack: [],
  cachedComponents: [],
  routeDirection: '', // forward|backward
  currentAppName: 'home',
  appList: []
})

export const mutations = {
  /**
   * @param {'light'|'dark'|'auto'} mode
   */
  setColorScheme (state, mode) {
    JSCookie.set('color_scheme', mode, { expires: 99999 })
    const colorSchemeClassName = getColorClassName(mode)
    state.colorSchemeClassName = colorSchemeClassName
  },
  cacheComponent (state, componentName) {
    const index = state.cachedComponents.indexOf(componentName)
    if (index === -1) {
      state.cachedComponents.push(componentName)
    }
  },
  popRoute (state, componentName) {
    const index = state.cachedComponents.indexOf(componentName)
    if (index !== -1) {
      state.cachedComponents.splice(index, 1)
    }
  },
  setRouteDirection (state, direction) {
    state.routeDirection = direction
  },
  setAppName (state, name) {
    state.currentAppName = name
  },
  setLastScrollPosition (state, value) {
    state.lastScrollPosition = value || 0
  },
  // set state's prevPath variable which is used inside banner navigation
  setPreviousPath (state, currentRoute) {
    if (!currentRoute) {
      currentRoute = 'index'
    } else {
      currentRoute = currentRoute.replace(/___[a-z][a-z]/g, '')
    }

    try {
      const index =
        state.routeMap[state.currentAppName].indexOf(currentRoute) - 1
      state.prevPath = state.routeMap[state.currentAppName][index]
    } catch (error) {
      console.error(
        'Could not set previous path. This page may not included in the routeMap.'
      )
      state.prevPath = 'index'
    }

    // Wrong routeMap error handling
    if (currentRoute !== 'index' && state.prevPath === undefined) {
      console.error(
        'Could not find previous path. You may not set routeMap properly.'
      )
    }
  }
}

export const actions = {
  /**
   * Runs on server at first
   */
  nuxtServerInit ({ commit, state }, { req }) {
    // set color scheme using cookie
    const cookies =
      req.headers && req.headers.cookie ? Cookie.parse(req.headers.cookie) : {}
    const mode = cookies.color_scheme

    commit('setColorScheme', mode)

    // set AppList using routeMap
    Object.keys(state.routeMap).forEach((key) => {
      state.appList.push(key)
    })
  }
}

export const getters = {
  // get previous route from routeMap
  getPreviousRoute: state => (currentRoute) => {
    currentRoute = currentRoute.replace(/___[a-z][a-z]/g, '')

    const index = state.routeMap[state.currentAppName].indexOf(currentRoute) - 1

    return state.routeMap[state.currentAppName][index]
  },
  // get previous path name from historyStack
  getPreviousPathName (state) {
    const path = state.historyStack[state.historyStack.length - 2]
    return path
  }
}
