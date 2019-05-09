export default class Location {
  constructor() {

  }

  static isRightDirection(to, from) {
    const routesList = [
      'home',
      'university',
      'building',
      'floor',
      'result'
    ]

    let fromIndex = routesList.indexOf(from)
    if (to === routesList[fromIndex + 1]) {
      return true
    } else {
      return false
    }
  }
}