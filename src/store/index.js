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

export const state = () => {
  colorSchemeClassName: 'light-mode' // default: 'light-mode'
}

export const mutations = {
  /**
   *
   * @param {'light'|'dark'|'auto'} mode
   */
  setColorScheme(state, mode) {
    JSCookie.set('color_scheme', mode, { expires: 99999 })
    let colorSchemeClassName = getColorClassName(mode)
    state.colorSchemeClassName = colorSchemeClassName
  }
}

export const actions = {
  /**
   * Runs on server at first
   */
  nuxtServerInit({ commit }, { req }) {
    const cookies =
      req.headers && req.headers.cookie ? Cookie.parse(req.headers.cookie) : {}
    const mode = cookies['color_scheme']

    commit('setColorScheme', mode)
  }
}
