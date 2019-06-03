/* ApiUrl.js
 * (c) 2019 Jang Haemin
 * @license MIT
 */

export default class ApiUrl {
  constructor() {}

  static get() {
    let hostname = window.location.hostname
    if (hostname === '127.0.0.1' || hostname === 'localhost') {
      return `https://api.eodiro.com`
    } else {
      return `${window.location.protocol}//api.${window.location.hostname.replace(/www./, '')}`
    }
  }
}