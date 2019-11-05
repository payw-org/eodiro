import JsCookie from 'js-cookie'
import CookieConfig from '~~/config/cookie'
const { langCookieName, colorSchemeCookieName } = CookieConfig

/**
 * @param {string} currentPath
 * @param {'kr' | 'en'} lang
 */
function getRedirectPath(currentPath, lang) {
  let newPath = currentPath
  const cleanPath = currentPath.replace(/^\/en/, '').replace(/\/$/, '')

  if (lang === 'kr') {
    newPath = cleanPath
    if (newPath === '') {
      newPath = '/'
    }
  } else if (lang === 'en') {
    newPath = `/en${cleanPath}`
  }

  return newPath
}

/**
 * @param {import('@nuxt/types').Context} context
 */
export default (context) => {
  const { route, store, redirect, app } = context

  // Color scheme init
  const userColorScheme = JsCookie.get(colorSchemeCookieName)
  store.commit('SET_COLOR_SCHEME', userColorScheme)

  // Language init
  const redirectLang = JsCookie.get(langCookieName)

  // Language cookie is not set
  if (!redirectLang) {
    const browserLang = window.navigator.language
      .slice(0, 2)
      .toLocaleLowerCase()

    if (browserLang === 'ko') {
      redirect(getRedirectPath(route.path, 'kr'))
    } else {
      redirect(getRedirectPath(route.path, 'en'))
    }

    return
  }

  // Language cookie available
  const routeName = route.name
  if (route.name !== undefined) {
    if (routeName.endsWith('___en')) {
      // Visit english url page
      if (redirectLang !== 'en') {
        // But cookie is set to Korean
        window.location.replace(getRedirectPath(route.path, 'kr'))
      }
    } else if (redirectLang === 'en') {
      // Route is Korean
      // but cookie is set to english
      window.location.replace(getRedirectPath(route.path, 'en'))
    }
  }

  // Polyfills
  require('~/polyfills')

  // Set cookies on client
  const i18nLang = JsCookie.get(langCookieName)
  if (!i18nLang) {
    JsCookie.set(langCookieName, app.i18n.locale, {
      expires: 99999
    })
  }

  // Prevent browser's default scroll restoration behaviour
  // history.scrollRestoration = 'manual'

  // Color scheme mode keyboard shorcuts
  // shift + ctrl + D | shift + ctrl + L
  window.addEventListener('keydown', (e) => {
    if (e.shiftKey && (e.metaKey || e.ctrlKey) && e.code === 'KeyL') {
      store.commit('SET_COLOR_SCHEME', 'light')
    } else if (e.shiftKey && (e.metaKey || e.ctrlKey) && e.code === 'KeyD') {
      store.commit('SET_COLOR_SCHEME', 'dark')
    }
  })

  // Assign topbar to window
  const topbar = require('~/modules/topbar').default
  window.topbar = topbar
}
