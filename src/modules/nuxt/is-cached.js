import cleanPathName from '~/modules/clean-path-name'

/**
 * @param {import('vuex').Store} store
 * @param {import('vue-router').Route} route
 */
export const isCached = function(store, route) {
  return store.state.cachedComponents.includes(cleanPathName(route.name))
}
