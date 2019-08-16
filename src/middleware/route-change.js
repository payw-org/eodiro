export default ({ app, from, route, store }) => {
  // set current app name
  let appName

  try {
    appName = route.meta[0].appName
  } catch (error) {
    if (route.name) {
      console.error(
        'Could not find AppName. Maybe you did not set an AppName for this page.'
      )
    } else {
      // error page
      appName = 'error'
    }
  }

  store.commit('setAppName', appName)

  if (!from) {
    // cache first loaded components
    route.matched.forEach((matched) => {
      store.commit('cacheComponent', matched.components.default.options.name)
    })
  }

  // set previous path
  if (route.name) {
    store.commit('setPreviousPath', route.name)
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
      console.error(
        'Could not find lastScrollPosition. You should extend EodiroPageBase for each page and add a meta data for each page as well.'
      )
    }
    store.commit('setLastScrollPosition', lastScrollPosition)

    // get routes' depth to determine the navigating direction
    let fromDepth = 9999
    let toDepth = -9999
    try {
      fromDepth = from.meta[from.meta.length - 1].depth
      toDepth = route.meta[route.meta.length - 1].depth

      if (fromDepth === undefined) {
        console.error('Could not find page depth from the previous page.')
      }
      if (toDepth === undefined) {
        console.error('Could not find page depth from this page.')
      }
    } catch (error) {
      console.log('Could not get page depth.')
    }

    // determine the route direction
    if (fromDepth < toDepth) {
      // forward

      // set direction to forward
      store.commit('setRouteDirection', 'forward')

      // cache the components in current route
      route.matched.forEach((matched) => {
        store.commit('cacheComponent', matched.components.default.options.name)
      })
    } else {
      // backward

      // set direction to backward
      store.commit('setRouteDirection', 'backward')

      // cache destination components if not cached
      route.matched.forEach((matched) => {
        store.commit('cacheComponent', matched.components.default.options.name)
      })

      // remove cached routes if go back
      // remove only the components which are not
      // included in the destination route
      from.matched.forEach((fromMatched) => {
        if (!route.matched.includes(fromMatched)) {
          store.commit('popRoute', fromMatched.components.default.options.name)
        }
      })
    }
  }
}
