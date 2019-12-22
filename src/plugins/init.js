import Auth from '~/modules/auth'
import ApiHost from '~/modules/eodiro-api/api-host'

// /**
//  * @param {string} currentPath
//  * @param {'ko' | 'en'} lang
//  */
// function getRedirectPath(currentPath, lang) {
//   let newPath = currentPath
//   const cleanPath = currentPath.replace(/^\/en/, '').replace(/\/$/, '')

//   if (lang === 'ko') {
//     newPath = cleanPath
//     if (newPath === '') {
//       newPath = '/'
//     }
//   } else if (lang === 'en') {
//     newPath = `/en${cleanPath}`
//   }

//   return newPath
// }

/**
 * @param {import('@nuxt/types').Context} context
 */
export default async (context) => {
  const { req, res, route, store } = context

  // Server init
  if (process.server) {
    if (!route.name) {
      return
    }

    // Set host name globally on server side
    ApiHost.setHost(req?.headers?.host)

    // Check authentication
    const isSignedIn = await Auth.isSignedIn({ req, res })
    if (isSignedIn) {
      store.commit('SET_SIGNED_IN', true)
    } else {
      store.commit('SET_SIGNED_IN', false)
    }
  }

  // Client init
  if (process.client) {
    // Polyfills
    require('~/polyfills')

    // Prevent browser's default scroll restoration behaviour
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Color scheme mode keyboard shorcuts
    // shift + ctrl + D | shift + ctrl + L
    window.addEventListener('keydown', (e) => {
      if (e.shiftKey && (e.metaKey || e.ctrlKey) && e.code === 'KeyL') {
        store.commit('SET_COLOR_SCHEME', { mode: 'light' })
      } else if (e.shiftKey && (e.metaKey || e.ctrlKey) && e.code === 'KeyD') {
        store.commit('SET_COLOR_SCHEME', { mode: 'dark' })
      }
    })

    // Assign topbar to window
    const topbar = require('~/modules/topbar').default
    window.topbar = topbar

    // Set host name globally on client side
    ApiHost.setHost(window.location.hostname)

    // Check authentication
    const isSignedIn = await Auth.isSignedIn()
    if (isSignedIn) {
      store.commit('SET_SIGNED_IN', true)
    } else {
      store.commit('SET_SIGNED_IN', false)
    }

    // Detect touch device
    // if ('ontouchstart' in window || navigator.maxTouchPoints) {
    //   window.isTouchDevice = true
    // } else {
    //   window.isTouchDevice = false
    // }
  }
}
