/* RouteLocation.js
 * (c) 2019 Jang Haemin
 * @license MIT
 */

export default class Location {
  constructor() {}

  static isRightDirection(to: string, from: string) {
    to = to.replace(/___[a-z][a-z]/g, '')
    from = from.replace(/___[a-z][a-z]/g, '')

    const routesList = [
      'vacant',
      'vacant-buildingId',
      'vacant-buildingId-floorId'
    ]

    const fromIndex = routesList.indexOf(from)
    const toIndex = routesList.indexOf(to)

    if (fromIndex < toIndex) {
      return true
    } else {
      return false
    }
  }
}
