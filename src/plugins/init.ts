import Cookie from 'cookie'

declare global {
  interface Window {
    topbar: any
  }
}

export default (context) => {
  const { app, req, res, route, store, redirect } = context

  // server init
  if (process.server) {
    if (!route.name) {
      return
    }
    // browser redirection
    const cookies =
      req.headers && req.headers.cookie ? Cookie.parse(req.headers.cookie) : {}
    const redirectLang = cookies.i18n_lang
    if (!redirectLang) {
      return
    }
    const routeName: string = route.name
    if (routeName.match(/___en$/)) {
      // English page
      if (redirectLang !== 'en') {
        let to = route.path.replace(/^\/en/, '').replace(/\/$/, '')
        if (to === '') {
          to = '/'
        }
        redirect(to)
      }
    } else {
      // Korean page
      if (redirectLang === 'en') {
        // console.log(`/en${route.path.replace(/\/$/, '')}`)
        redirect(`/en${route.path.replace(/\/$/, '')}`)
      }
    }
  }

  // client init
  if (process.client) {
    // prevent contextmenu popup
    window.oncontextmenu = function (e) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    // prevent browser's default scroll restoration behaviour
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
