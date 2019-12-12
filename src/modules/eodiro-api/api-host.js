export default class ApiHost {
  /**
   * Set host name to be used globally
   * @param {string} host
   */
  static setHost(host) {
    if (host.startsWith('eodiro')) {
      host = 'https://' + host
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
