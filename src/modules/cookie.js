import JsCookie from 'js-cookie'
import NodeCookie from 'cookie'

export default class Cookie {
  /**
   * @param {Object} http
   * @param {import('http').IncomingMessage} http.req
   * @param {import('http').ServerResponse} http.res
   */
  constructor(http) {
    if (http && http.res) {
      this.res = http.res
    }
    if (http && http.req) {
      this.req = http.req
    }
  }

  /**
   * @param {string} name
   */
  get(name) {
    let tokens
    if (this.req) {
      const cookies =
        this.req.headers && this.req.headers.cookie
          ? NodeCookie.parse(this.req.headers.cookie)
          : {}
      tokens = cookies[name]
    } else if (typeof window !== 'undefined') {
      tokens = JsCookie.get(name)
    } else {
      console.warn(
        'You are using eodiro Cookie get on server side without passing incoming message.'
      )
      return
    }

    try {
      return JSON.parse(tokens)
    } catch (err) {
      return tokens
    }
  }

  /**
   * @param {string} name
   * @param {string | Object} value
   * @param {Object} options
   * @param {Date} options.expires
   * @param {string} options.path
   */
  set(name, value, options) {
    if (this.res) {
      // If the value is an object
      // convert to JSON string
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }

      // Initialize a cookie string with the value
      let cookie = `${name}=${value};`

      // Append expires
      if (options.expires) {
        cookie += `Expires=${options.expires.toString()};`
      }

      // Append cookie path
      if (options.path) {
        // Clean the path
        cookie += `Path=${options.path.replace(/'/g, '')};`
      }
      this.res.setHeader('Set-Cookie', [cookie])
    } else if (typeof window !== 'undefined') {
      JsCookie.set(name, value, {
        expires: options.expires,
        path: options.path
      })
    } else {
      console.warn(
        'You are using eodiro Cookie set on server side without passing server response object.'
      )
    }
  }

  /**
   * @param {string} name
   */
  remove(name) {
    if (this.res) {
      this.res.setHeader('Set-Cookie', [
        `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      ])
    } else if (typeof window !== 'undefined') {
      JsCookie.remove(name)
    }
  }
}
