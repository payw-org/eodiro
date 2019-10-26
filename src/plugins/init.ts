import Cookie from 'cookie'
import { Context } from '@nuxt/types'
import JsCookie from 'js-cookie'
import CookieConfig from '~~/config/cookie'
const { langCookieName } = CookieConfig

declare global {
  interface Window {
    topbar: any
  }
}

function getRedirectPath(currentPath: string, lang: 'kr' | 'en') {
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

export default (context: Context) => {
  const { req, route, store, redirect, app } = context

  // Server init
  if (process.server) {
    if (!route.name) {
      return
    }
    // Browser redirection
    const cookies =
      req.headers && req.headers.cookie ? Cookie.parse(req.headers.cookie) : {}
    const redirectLang = cookies[langCookieName]
    if (!redirectLang) {
      // Language cookie is not set yet
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
    const routeName: string = route.name
    if (routeName.endsWith('___en')) {
      // Visit english url page
      if (redirectLang !== 'en') {
        // But cookie is set to Korean
        redirect(getRedirectPath(route.path, 'kr'))
      }
    } else if (redirectLang === 'en') {
      redirect(getRedirectPath(route.path, 'en'))
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
}
