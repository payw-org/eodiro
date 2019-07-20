import ColorScheme from '~/plugins/ColorScheme.ts'
import Cookie from 'cookie'

export default context => {
  const { app, req, route, store, redirect } = context

  if (process.server) {
    if (!route.name) {
      return
    }
    // browser redirection
    const cookies = Cookie.parse(req.headers.cookie)
    const redirectLang = cookies['i18n_redirected']
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

  // only client side
  if (process.client) {
    // set color scheme on load
    ColorScheme.setColorScheme()

    // testing
    // detect browser language and recommend right language url
    let browserLang = navigator.language.split('-')
    let urlLang = window.location.pathname.split('/')[1]

    console.log(`browser: ${browserLang}, route: ${urlLang}`)
  }
}
