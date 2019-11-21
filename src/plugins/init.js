import JsCookie from 'js-cookie'
import CookieConfig from '~~/config/cookie'
import Auth from '~/modules/auth'
import EodiroCookie from '~/modules/cookie'
const { langCookieName } = CookieConfig

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
export default async (context) => {
  const { req, res, route, store, redirect, app } = context

  // Server init
  if (process.server) {
    if (!route.name) {
      return
    }

    // Browser redirection
    const eodiroCookie = new EodiroCookie({ req, res })
    const redirectLang = eodiroCookie.get(langCookieName)

    // Language cookie is not set yet
    if (!redirectLang) {
      const acceptLang = req.headers['accept-language']
        ? req.headers['accept-language'].slice(0, 2).toLowerCase()
        : undefined
      if (acceptLang === 'ko') {
        redirect(getRedirectPath(route.path, 'kr'))
      } else {
        redirect(getRedirectPath(route.path, 'en'))
      }
      return
    }

    // Language cookie available
    const routeName = route.name
    if (routeName.endsWith('___en')) {
      // Visit english url page
      if (redirectLang !== 'en') {
        // But cookie is set to Korean
        redirect(getRedirectPath(route.path, 'kr'))
      }
    } else if (redirectLang === 'en') {
      redirect(getRedirectPath(route.path, 'en'))
    }

    // Set color scheme using cookie
    const mode = eodiroCookie.get('color_scheme')
    if (!mode) {
      store.commit('SET_COLOR_SCHEME', {
        mode,
        res
      })
    }

    // Check authentication
    const isSignedIn = await Auth.isSignedIn({ req, res })
    if (isSignedIn) {
      store.commit('SET_SIGNED_IN', true)
    }
  }

  // Client init
  if (process.client) {
    // Polyfills
    require('~/polyfills')

    // Set cookies on client
    const i18nLang = JsCookie.get(langCookieName)
    if (!i18nLang) {
      JsCookie.set(langCookieName, app.i18n.locale, { expires: 99999 })
    }

    // Prevent browser's default scroll restoration behaviour
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

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

    // Authorization
    const isSignedIn = await Auth.isSignedIn()
    if (isSignedIn) {
      store.commit('SET_SIGNED_IN', true)
    } else {
      store.commit('SET_SIGNED_IN', false)
    }
  }
}
