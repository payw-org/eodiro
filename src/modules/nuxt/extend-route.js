/**
 * 'extend-route' module for Nuxt.js
 *
 * It automatically assigns page depth, hamlet name
 * and previous page's route for each route.
 *
 * (c) 2019 Jang Haemin
 * @license MIT
 */

const hamletRoutes = {}

export default function() {
  this.extendRoutes((routes) => {
    // Start sniffing routes
    sniffRoutes(routes)
  })
}

function sniffRoutes(routes) {
  if (!routes || !routes.length || routes.length < 1) {
    return
  }

  // Loop through routes
  for (let i = 0; i < routes.length; i += 1) {
    // Assign
    const route = routes[i]

    // Validate meta key before adding keys to it
    validateMeta(route)

    // Set hamlet name
    setHamletName(route)

    // Set route depth
    // setRouteDepth(route)

    // Set previous route name
    // setPrevRouteName(route)

    if (route.children) {
      sniffRoutes(route.children)
    }
  }

  // Set route depth and previous route name
  setDepthAndPrevRoute()
}

function setHamletName(route) {
  const path = getClearDirPath(route)

  let hamletName = ''
  if (path === '') {
    hamletName = 'home'
  } else {
    hamletName = path.split('/')[0]
  }

  route.meta.hamletName = hamletName
  if (!hamletRoutes[hamletName]) {
    hamletRoutes[hamletName] = []
  }
  if (route.name) {
    hamletRoutes[hamletName].push(route)
  }
}

function setDepthAndPrevRoute() {
  for (const hamletName in hamletRoutes) {
    const routes = hamletRoutes[hamletName]
    for (let i = 0; i < routes.length; i += 1) {
      if (routes[i].name === 'index') {
        routes[i].meta.prevRouteName = undefined
        routes[i].meta.depth = 0
      } else if (routes[i - 1]) {
        routes[i].meta.prevRouteName = routes[i - 1].name
        routes[i].meta.depth = i + 1
      } else {
        routes[i].meta.prevRouteName = 'index'
        routes[i].meta.depth = i + 1
      }
    }
  }
  // console.log(hamletRoutes)
}

// function setRouteDepth(route) {
//   let routeDepth = 0

//   if (route.name === 'index') {
//     routeDepth = 0
//   } else if (!route.name) {
//     routeDepth = undefined
//   } else {
//     const routeNameWithoutHamlet = route.name.replace(route.meta.hamletName, '')
//     const routeTrace = routeNameWithoutHamlet.split('-')
//     routeTrace[0] = route.meta.hamletName
//     const slashCount = countChar(getClearDirPath(route), /\//g)
//     routeDepth = slashCount + 1
//   }

//   route.meta.depth = routeDepth
// }

// Simple algorithm.
// For example, "route-name-like-this"
// should go back to "route-name-like"
// function setPrevRouteName(route) {
//   let prevRouteName

//   if (!route.name) {
//     return
//   }

//   if (route.name === 'index') {
//     // Home
//     prevRouteName = undefined
//   } else if (route.name === route.meta.hamletName) {
//     // Hamlet entry
//     prevRouteName = 'index'
//   } else {
//     // 1. Remove hamlet name from route's name
//     // 2. Split route name with '-'
//     // 3. Join with `length - 1`
//     const routeNameWithoutHamlet = route.name.replace(route.meta.hamletName, '')
//     const routeTrace = routeNameWithoutHamlet.split('-')
//     routeTrace[0] = route.meta.hamletName
//     const newTrace = routeTrace.slice(0, routeTrace.length - 1)
//     prevRouteName = newTrace.join('-')

//     if (!findRouteName(globalRoutes, prevRouteName)) {
//       prevRouteName = 'index'
//     }
//   }

//   route.meta.prevRouteName = prevRouteName
// }

// function findRouteName(routes, routeName) {
//   for (let i = 0; i < routes.length; i += 1) {
//     const r = routes[i]
//     if (r.children) {
//       const existInsideChildren = findRouteName(r.children, routeName)
//       if (existInsideChildren) {
//         return true
//       }
//     }

//     if (r.name === routeName) {
//       return true
//     }
//   }
//   return false
// }

// Count characters from string with regular expression
// function countChar(str, regExp) {
//   if (!str) {
//     return 0
//   }
//   return (str.match(regExp) || []).length
// }

function validateMeta(route) {
  if (!route.meta) {
    route.meta = {}
  }
}

// Deletes 'pages/', 'index' from route's chunkName
// and returns relative path from '~/pages/'
function getClearDirPath(route) {
  return route.chunkName.replace(/^pages\//g, '').replace(/\/?index$/g, '')
}
