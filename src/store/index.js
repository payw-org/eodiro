import JsCookie from 'js-cookie'

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
    'sign-up'
  ]
})

export const mutations = {
  /**
   * @param {'light'|'dark'|'auto'} mode
   */
  SET_COLOR_SCHEME(state, mode) {
    if (!mode) {
      mode = 'light'
    }

    JsCookie.set('color_scheme', mode, { expires: 99999 })
    const colorSchemeClassName = getColorClassName(mode)
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
  }
}
