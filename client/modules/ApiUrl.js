export default class ApiUrl {
  constructor() {}

  static get() {
    let hostname = window.location.hostname
    if (hostname === '127.0.0.1' || hostname === 'localhost') {
      return `http://api.dev-jhm.eodiro.com`
    } else {
      return `${window.location.protocol}//api.${window.location.hostname.replace(/www./, '')}`
    }
  }
}