export default class Location {
  constructor() {}

  static isRightDirection(to, from) {
    const routesList = [
      'home',
      'university',
      'building',
      'floor',
      'result'
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