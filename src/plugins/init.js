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
  const { store, app, route, redirect } = context

  const pathnameQueryString = location.pathname + location.search

  // Language init
  const redirectLang = JsCookie.get(langCookieName)

  // Language cookie is not set
  if (!redirectLang) {
    const browserLang = window.navigator.language
      .slice(0, 2)
      .toLocaleLowerCase()

    if (browserLang === 'ko') {
      redirect(getRedirectPath(pathnameQueryString, 'kr'))
    } else {
      redirect(getRedirectPath(pathnameQueryString, 'en'))
    }
  }

  // Language cookie available
  const routeName = route.name
  if (routeName !== undefined) {
    if (routeName.endsWith('___en')) {
      // Visit english url page
      if (redirectLang !== 'en') {
        // But cookie is set to Korean
        window.location.replace(getRedirectPath(pathnameQueryString, 'kr'))
      }
    } else if (redirectLang === 'en') {
      // Route is Korean
      // but cookie is set to english
      window.location.replace(getRedirectPath(pathnameQueryString, 'en'))
    }
  }

  // Single Page Apps for GitHub Pages
  // https://github.com/rafrex/spa-github-pages
  // Copyright (c) 2016 Rafael Pedicini, licensed under the MIT License
  // ----------------------------------------------------------------------
  // This script checks to see if a redirect is present in the query string
  // and converts it back into the correct url and adds it to the
  // browser's history using window.history.replaceState(...),
  // which won't cause the browser to attempt to load the new url.
  // When the single page app is loaded further down in this file,
  // the correct url will be waiting in the browser's history for
  // the single page app to route accordingly.
  (function(l) {
    if (l.search) {
      var q = {}
      l.search
        .slice(1)
        .split('&')
        .forEach(function(v) {
          var a = v.split('=')
          q[a[0]] = a
            .slice(1)
            .join('=')
            .replace(/~and~/g, '&')
        })

      // Find the key "p"
      // /?p=
      if (q.p !== undefined) {
        window.history.replaceState(
          null,
          null,
          l.pathname.slice(0, -1) +
            (q.p || '') +
            (q.q ? '?' + q.q : '') +
            l.hash
        )
      }
    }
  })(window.location)

  // Color scheme init
  const userColorScheme = JsCookie.get(colorSchemeCookieName)
  store.commit('SET_COLOR_SCHEME', userColorScheme)

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
