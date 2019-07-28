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

  // when routing through the pages
  if (!store.state.isFirstLoad) {
    // fetch last scroll position of a destination
    // if not set, set it 0
    store.commit(
      'setLastScrollPosition',
      route.matched[route.matched.length - 1].components.default.options.meta
        .lastScrollPosition
    )

    // get routes' depth to determine the navigating direction
    let fromDepth = from.meta[from.meta.length - 1].depth
    let toDepth = route.meta[route.meta.length - 1].depth

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

    // trigger banner fax transition
    store.commit('banner/triggerTransition')
  }

  // set current app name
  let appName = route.meta[0].appName
  store.commit('setAppName', appName)

  // set previous path
  store.commit('setPreviousPath', route.name)
}
