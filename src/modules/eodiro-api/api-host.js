export default class ApiHost {
  /**
   * Set host name to be used globally
   * @param {string} host
   */
  static setHost(host) {
    if (host.startsWith('eodiro')) {
      // eodiro.com
      host = 'https://api2.eodiro.com'
    } else if (host.startsWith('dev')) {
      // dev.eodiro.com
      host = 'https://dev.api2.eodiro.com'
    } else {
      // Dev
      host = 'http://' + host.split(':')[0] + ':4020'
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
