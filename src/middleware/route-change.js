export default ({ app, from, route, store }) => {
  if (!from) {
    // if there is no 'from' route
    // it's first load

    // set first load to true
    store.commit('setFirstLoad', true)

    // cache first loaded components
    route.matched.forEach(matched => {
      store.commit('cacheComponent', matched.components.default.options.name)
    })
  } else {
    store.commit('setFirstLoad', false)
  }

  if (from) {
    // get routes' depth to determine the navigating direction
    let fromDepth = from.meta[from.meta.length - 1].depth
    let toDepth = route.meta[route.meta.length - 1].depth

    if (fromDepth < toDepth) {
      // forward

      // set direction to forward
      store.commit('setRouteDirection', 'forward')

      // cache the components in current route
      route.matched.forEach(matched => {
        store.commit('cacheComponent', matched.components.default.options.name)
      })

      // when forward, shift banner to top
      // prevent iOS negative inertia scroll
      if (store.state.banner.top <= 0) {
        store.commit('banner/shift', store.state.banner.top)
      }
    } else {
      // backward

      // set direction to backward
      store.commit('setRouteDirection', 'backward')

      // remove cached routes if go back
      from.matched.forEach(matched => {
        store.commit('popRoute', matched.components.default.options.name)
      })

      // shift banner with a calculated value
      // prevent iOS negative inertia scroll
      if (store.state.banner.top <= 0) {
        let lastScrollPosition =
          route.matched[route.matched.length - 1].components.default.options
            .meta.lastScrollPosition

        let a = lastScrollPosition
        let b = Math.abs(store.state.banner.top)
        let c = store.state.banner.navHeight
        let d = store.state.banner.height
        let e = Math.abs(d - b - c)

        if (a !== undefined) {
          if (a > b) {
            // shift up

            if (a > d - c) {
              // shift max available
              store.commit('banner/shift', e)
            } else {
              // shift with distance
              store.commit('banner/shift', a - b)
            }
          } else {
            // shift down
            store.commit('banner/shift', a - b)
          }
        }
      }
    }
  }

  // set current app name
  let appName = route.meta[0].appName
  store.commit('setAppName', appName)
}
