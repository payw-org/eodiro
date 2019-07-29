export default ({ app, from, route, store }) => {
  // console.log(route)
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

  // set current app name
  let appName =
    route.meta[0] && route.meta[0].appName ? route.meta[0].appName : 'error'
  store.commit('setAppName', appName)

  //

  // when routing through the pages: not first load
  if (!store.state.isFirstLoad) {
    // fetch last scroll position of a destination
    // if not set, set it 0
    try {
      store.commit(
        'setLastScrollPosition',
        route.matched[route.matched.length - 1].components.default.options.meta
          .lastScrollPosition
      )
    } catch (error) {
      console.error(error)
      store.commit('setLastScrollPosition', 0)
    }

    // get routes' depth to determine the navigating direction
    let fromDepth =
      from.meta[from.meta.length - 1] &&
      from.meta[from.meta.length - 1].hasOwnProperty('depth')
        ? from.meta[from.meta.length - 1].depth
        : 9999
    let toDepth =
      route.meta[route.meta.length - 1] &&
      route.meta[route.meta.length - 1].hasOwnProperty('depth')
        ? route.meta[route.meta.length - 1].depth
        : -9999

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

    // set previous path
    if (route.name) {
      store.commit('setPreviousPath', route.name)
    } else {
      store.commit('setPreviousPath', 'index')
    }

    // trigger banner fax transition
    store.commit('banner/triggerTransition')
  }
}
