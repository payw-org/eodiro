export default ({ app, from, route, store }) => {
  // set current app name
  let appName = 'error'
  try {
    appName = route.meta[0].appName
  } catch (error) {
    console.error(error)
  }
  store.commit('setAppName', appName)

  if (!from) {
    // cache first loaded components
    route.matched.forEach(matched => {
      store.commit('cacheComponent', matched.components.default.options.name)
    })
  }

  // set previous path
  if (route.name) {
    store.commit('setPreviousPath', route.name)
  } else {
    store.commit('setPreviousPath', 'index')
  }

  try {
    if (route.meta[route.meta.length - 1].bannerMode === 'mini') {
      store.commit('banner/enableForcedMini')
    } else {
      store.commit('banner/disableForcedMini')
    }
  } catch (error) {
    console.log(error)
  }

  // when routing through the pages: not first load
  if (from) {
    // fetch last scroll position of a destination
    // if not set, set it 0
    let lastScrollPosition = 0
    try {
      lastScrollPosition =
        route.matched[route.matched.length - 1].components.default.options.meta
          .lastScrollPosition
    } catch (error) {
      console.error(error)
    }
    store.commit('setLastScrollPosition', lastScrollPosition)

    // get routes' depth to determine the navigating direction
    let fromDepth = 9999
    let toDepth = -9999
    try {
      fromDepth = from.meta[from.meta.length - 1].depth
      toDepth = route.meta[route.meta.length - 1].depth
    } catch (error) {
      console.log(error)
    }

    // determine the route direction
    if (fromDepth < toDepth) {
      // forward

      // set direction to forward
      store.commit('setRouteDirection', 'forward')

      // cache the components in current route
      route.matched.forEach(matched => {
        store.commit('cacheComponent', matched.components.default.options.name)
      })
    } else {
      // backward

      // set direction to backward
      store.commit('setRouteDirection', 'backward')

      // cache back page if not cached
      route.matched.forEach(matched => {
        store.commit('cacheComponent', matched.components.default.options.name)
      })

      // remove cached routes if go back
      from.matched.forEach(matched => {
        store.commit('popRoute', matched.components.default.options.name)
      })
    }
  }
}
