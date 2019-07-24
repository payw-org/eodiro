export default class DayToString {
  constructor() {}

  /**
   * @param {number} dayNum 
   */
  static dts(dayNum) {
    if (dayNum === 0) {
      return 'SUN'
    } else if (dayNum === 1) {
      return 'MON'
    } else if (dayNum === 2) {
      return 'TUE'
    } else if (dayNum === 3) {
      return 'WED'
    } else if (dayNum === 4) {
      return 'THU'
    } else if (dayNum === 5) {
      return 'FRI'
    } else if (dayNum === 6) {
      return 'SAT'
    }
  }
}