import JsCookie from 'js-cookie'
import NodeCookie from 'cookie'
import dayjs from 'dayjs'
import useAxios from '~/modules/use-axios'

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

    this.cookieStack = []
  }

  /**
   * Only for server-side cookie
   * @param {string} name
   * @param {string | Object} value
   */
  generateCookieString(name, value, options) {
    if (!this.res) {
      console.warn("Don't use generateCookieString() on client side")
      return undefined
    }

    // If the value is an object
    // convert to JSON string
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }

    // Initialize a cookie string with the value
    let cookie = `${name}=${value};`

    // Append expires
    if (options && options.expires) {
      cookie += `Expires=${options.expires.toUTCString()};`
    }

    // Append cookie path
    if (options && options.path) {
      // Clean the path
      cookie += `Path=${options.path.replace(/'/g, '')};`
    }

    return cookie
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
  async set(name, value, options) {
    if (this.res) {
      const cookie = this.generateCookieString(name, value, options)
      this.res.setHeader('Set-Cookie', cookie)
    } else if (typeof window !== 'undefined') {
      // Use Nuxt server API instead of JSCookie
      // due to Safari's cookie expiration date restriction on client side
      await useAxios({
        url: '/api/set-cookie',
        method: 'post',
        data: {
          name,
          value,
          options,
        },
      })
    } else {
      console.warn(
        'You are using eodiro Cookie set on server side without passing server response object.'
      )
    }
  }

  /**
   * Adds a cookie to the stack. Run bulkSet() after piling up.
   */
  pile(name, value, options) {
    const cookie = this.generateCookieString(name, value, options)
    if (cookie) {
      this.cookieStack.push(cookie)
    }
  }

  bulkSet() {
    if (!this.res) {
      console.warn('bulkSet() works only on server-side')
      return
    }

    if (this.cookieStack.length > 0) {
      this.res.setHeader('Set-Cookie', this.cookieStack)
      this.cookieStack = []
    }
  }

  /**
   * @param {string} name
   */
  remove(name) {
    if (this.res) {
      this.res.setHeader('Set-Cookie', [
        `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      ])
    } else if (typeof window !== 'undefined') {
      JsCookie.remove(name)
    }
  }
}

export const defaultCookieOptions = {
  expires: dayjs('2500-12-31').toDate(),
  path: '/',
}
