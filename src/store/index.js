import JsCookie from 'js-cookie'
import Cookies from 'universal-cookie'
import dayjs from 'dayjs'
import Auth from '~/modules/auth'

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
   * @param {import('@nuxt/types').NuxtAppOptions} payload.app
   */
  SET_COLOR_SCHEME(state, payload) {
    const { mode, app } = payload

    let newMode = mode

    if (!mode) {
      newMode = 'light'
    }

    if (app) {
      app.$cookies.set('color_scheme', newMode, {
        path: '/',
        expires: dayjs('2500-12-31').toDate()
      })
    } else {
      JsCookie.set('color_scheme', newMode, {
        path: '/',
        expires: dayjs('2500-12-31').toDate()
      })
    }

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
  /**
   * Run on server at first
   * @param {import('@nuxt/types').Context} ctx
   */
  async nuxtServerInit({ commit }, ctx) {
    const { req, app } = ctx

    // set color scheme using cookie
    const cookies = new Cookies(req.headers.cookie)
    const mode = cookies.get('color_scheme')
    commit('SET_COLOR_SCHEME', {
      mode,
      app
    })

    const isSignedIn = await Auth.isSignedIn(app)
    if (isSignedIn) {
      commit('SET_SIGNED_IN', true)
    }
  }
}
