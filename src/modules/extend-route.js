/* 'extend-route' module for Nuxt.js
 *
 * It automatically assigns page depth, hamlet name
 * and previous page's route for each route.
 *
 * (c) 2019 Jang Haemin
 * @license MIT
 */

export default function (moduleOptions) {
  this.extendRoutes((routes) => {
    // Start sniffing routes
    sniffRoutes(routes)
  })
}

function sniffRoutes (routes) {
  if (!routes || !routes.length || routes.length < 1) {
    return
  }

  // Loop through routes
  for (let i = 0; i < routes.length; i += 1) {
    // Assign
    const route = routes[i]

    // Validate meta key before adding keys to it
    validateMeta(route)

    setRouteDepth(route)

    // Set previous route name
    setPrevRouteName(route)

    // Set hamlet name
    setHamletName(route)

    if (route.children) {
      sniffRoutes(route.children)
    }
  }
}

function setRouteDepth (route) {
  let routeDepth = 0

  if (route.name === 'index') {
    routeDepth = 0
  } else if (!route.name) {
    routeDepth = undefined
  } else {
    const slashCount = countChar(getClearDirPath(route), /\//g)
    routeDepth = slashCount + 1
  }

  route.meta.depth = routeDepth
}

// Simple algorithm.
// For example, "route-name-like-this"
// should go back to "route-name-like"
function setPrevRouteName (route) {
  let prevRouteName

  if (route.name === 'index') {
    prevRouteName = undefined
  } else if (countChar(route.name, /-/g) === 0) {
    prevRouteName = 'index'
  } else {
    const routeTraces = route.name.split('-')
    prevRouteName = routeTraces.slice(0, routeTraces.length - 1).join('-')
  }

  route.meta.prevRouteName = prevRouteName
}

function setHamletName (route) {
  const path = getClearDirPath(route)

  let hamletName = ''
  if (path === '') {
    hamletName = 'home'
  } else {
    hamletName = path.split('/')[0]
  }

  route.meta.hamletName = hamletName
}

// Count characters from string with regular expression
function countChar (str, regExp) {
  if (!str) {
    return 0
  }
  return (str.match(regExp) || []).length
}

function validateMeta (route) {
  if (!route.meta) {
    route.meta = {}
  }
}

// Deletes 'pages/', 'index' from route's chunkName
// and returns relative path from '~/pages/'
function getClearDirPath (route) {
  return route.chunkName.replace(/^pages\//g, '').replace(/\/?index$/g, '')
}
