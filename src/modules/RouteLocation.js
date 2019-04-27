export default class Location {
  constructor() {

  }

  static isRightDirection(to, from) {
    if (
      from === 'home' && to === 'buildings' ||
      from === 'buildings' && to === 'floors' ||
      from === 'floors' && to === 'result'
    ) {
      return true
    } else {
      return false
    }
  }
}