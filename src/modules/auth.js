import Axios from 'axios'
import apiUrl from '~/modules/api-url'
import JsCookie from 'js-cookie'

/**
 * @typedef Tokens
 * @type {Object}
 * @property {string} accessToken
 * @property {string} refreshToken
 */

export default class Auth {
  /**
   * @param {import('@nuxt/types').NuxtAppOptions} app
   * @returns {Promise<boolean>}
   */
  static isSignedIn(app) {
    this.validate(app)

    if (!this.getAccessToken(app)) {
      return new Promise((resolve) => {
        resolve(false)
      })
    }

    return new Promise((resolve) => {
      Axios({
        ...apiUrl.user.isSignedIn,
        headers: {
          accessToken: `${this.getAccessToken(app)}`
        }
      })
        .then((res) => {
          resolve(true)
        })
        .catch(() => {
          // If the access token is expired
          // refresh tokens with refresh token
          Axios({
            ...apiUrl.user.refreshToken,
            headers: {
              refreshToken: `${this.getRefreshToken(app)}`
            }
          })
            .then((res) => {
              // Successfully refreshed the tokens
              const { data } = res
              this.setJwt(data.accessToken, data.refreshToken, app)
              resolve(true)
            })
            .catch(() => {
              // Failed to refresh
              // In this situation, user must re-login
              resolve(false)
            })
        })
    })
  }

  /**
   * @param {import('@nuxt/types').NuxtAppOptions} app
   * @returns {string}
   */
  static getAccessToken(app) {
    const tokens = this.getJwt(app)
    if (tokens) {
      return tokens.accessToken
    } else {
      return undefined
    }
  }

  /**
   * @param {import('@nuxt/types').NuxtAppOptions} app
   * @returns {string}
   */
  static getRefreshToken(app) {
    const tokens = this.getJwt(app)
    if (tokens) {
      return tokens.refreshToken
    } else {
      return undefined
    }
  }

  /**
   * Get JWT object containing both access token and refresh token
   * @param {import('@nuxt/types').NuxtAppOptions} app
   * @returns {Tokens}
   */
  static getJwt(app) {
    this.validate(app)
    if (app) {
      const tokens = app.$cookies.get('tokens')
      return tokens
    } else {
      const tokens = JsCookie.get('tokens')
      if (tokens) {
        return JSON.parse(tokens)
      }
    }
  }

  /**
   * @param {string} accessToken
   * @param {import('@nuxt/types').NuxtAppOptions} app
   */
  static setAccessToken(accessToken, app) {
    this.validate(app)
    const tokens = this.getJwt()
    tokens.accessToken = accessToken
    if (app) {
      app.$cookies.set('tokens', tokens)
    } else {
      JsCookie.set('tokens', JSON.stringify(tokens))
    }
  }

  /**
   * @param {string} refreshToken
   * @param {import('@nuxt/types').NuxtAppOptions} app
   */
  static setRefreshToken(refreshToken, app) {
    this.validate(app)
    const tokens = JSON.parse(localStorage.getItem('tokens'))
    tokens.refreshToken = refreshToken
    if (app) {
      app.$cookies.set('tokens', tokens)
    } else {
      JsCookie.set('tokens', JSON.stringify(tokens))
    }
  }

  /**
   * @param {string} accessToken
   * @param {string} refreshToken
   * @param {import('@nuxt/types').NuxtAppOptions} app
   */
  static setJwt(accessToken, refreshToken, app) {
    this.validate(app)
    const tokens = {
      accessToken,
      refreshToken
    }
    if (app) {
      app.$cookies.set('tokens', tokens)
    } else {
      JsCookie.set('tokens', JSON.stringify(tokens))
    }
  }

  /**
   * @param {import('@nuxt/types').NuxtAppOptions} app
   */
  static clearJwt(app) {
    this.validate(app)
    if (app) {
      app.$cookies.remove('tokens')
    } else {
      JsCookie.remove('tokens')
    }
  }

  /**
   * @param {import('@nuxt/types').NuxtAppOptions} app
   */
  static validate(app) {
    if (!app && typeof window === 'undefined') {
      console.warn(
        'You may use Auth on server side without passing the Nuxt App options'
      )
    }
  }
}

Auth.cookie = undefined
