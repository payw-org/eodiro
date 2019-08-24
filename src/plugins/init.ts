import Cookie from 'cookie'
import { CEM } from './custom-event-manager'

declare global {
  interface Window {
    topbar: any
  }
}

export default (context: any) => {
  const { req, route, store, redirect } = context

  // Server init
  if (process.server) {
    if (!route.name) {
      return
    }
    // Browser redirection
    const cookies =
      req.headers && req.headers.cookie ? Cookie.parse(req.headers.cookie) : {}
    const redirectLang = cookies.i18n_lang
    if (!redirectLang) {
      return
    }
    const routeName: string = route.name
    if (routeName.endsWith('___en')) {
      // English page
      if (redirectLang !== 'en') {
        let to = route.path.replace(/^\/en/, '').replace(/\/$/, '')
        if (to === '') {
          to = '/'
        }
        redirect(to)
      }
    } else if (redirectLang === 'en') {
      // console.log(`/en${route.path.replace(/\/$/, '')}`)
      redirect(`/en${route.path.replace(/\/$/, '')}`)
    }
  }

  // Client init
  if (process.client) {
    // Polyfills
    require('~/polyfills')

    // Prevent browser's default scroll restoration behaviour
    history.scrollRestoration = 'manual'

    window.addEventListener('keydown', (e) => {
      if (e.shiftKey && e.key === 'L') {
        store.commit('setColorScheme', 'light')
      } else if (e.shiftKey && e.key === 'D') {
        store.commit('setColorScheme', 'dark')
      }
    })

    // Assign topbar to window
    const topbar = require('./topbar').default
    window.topbar = topbar
  }
}
