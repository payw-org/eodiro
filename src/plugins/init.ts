import Cookie from 'cookie'

export default context => {
  const { app, req, res, route, store, redirect } = context

  if (process.server) {
    if (!route.name) {
      return
    }
    // browser redirection
    const cookies =
      req.headers && req.headers.cookie ? Cookie.parse(req.headers.cookie) : {}
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
}
