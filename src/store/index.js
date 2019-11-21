import dayjs from 'dayjs'
import EodiroCookie from '~/modules/cookie'

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
    'me'
  ],
  auth: {
    isSignedIn: false
  }
})

export const mutations = {
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

    const eodiroCookie = new EodiroCookie({ res })
    eodiroCookie.set('color_scheme', newMode, {
      expires: dayjs('2500-12-31').toDate(),
      path: '/'
    })

    const colorSchemeClassName = getColorClassName(newMode)
    state.colorSchemeClassName = colorSchemeClassName
  },
  /**
   * @param {string} componentName
   */
  CACHE_COMPONENT(state, componentName) {
    const index = state.cachedComponents.indexOf(componentName)
    if (index === -1) {
      state.cachedComponents.push(componentName)
    }
  },
  /**
   * @param {string} componentName
   */
  POP_COMPONENT(state, componentName) {
    const index = state.cachedComponents.indexOf(componentName)
    if (index !== -1) {
      state.cachedComponents.splice(index, 1)
    }
  },
  /**
   * @param {boolean} bool
   */
  SET_SIGNED_IN(state, bool) {
    state.auth.isSignedIn = bool
  }
}

export const actions = {
  nuxtServerInit({ commit, state }, { req, res }) {
    // If color scheme is set in cookie
    // initialize vuex store with the value
    const eodiroCookie = new EodiroCookie({ req, res })
    const colorScheme = eodiroCookie.get('color_scheme')
    if (colorScheme) {
      state.colorSchemeClassName = getColorClassName(colorScheme)
    }
  }
}
