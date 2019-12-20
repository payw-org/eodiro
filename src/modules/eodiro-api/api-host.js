export default class ApiHost {
  /**
   * Set host name to be used globally
   * @param {string} host
   */
  static setHost(host) {
    if (host.includes('eodiro')) {
      host = 'https://api2.eodiro.com'
    } else {
      host = 'http://' + host.split(':')[0] + ':4000'
    }

    this.host = host
  }

  /**
   * Returns API host name
   */
  static getHost() {
    return this.host
  }
}
