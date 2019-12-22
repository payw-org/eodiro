export default class Api {
  /**
   * @param {Http=} http
   */
  constructor(http) {
    this.http = http
  }

  /**
   * @param {Http} http
   */
  setHttp(http) {
    this.http = http
    return this
  }
}
