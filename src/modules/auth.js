import Axios from 'axios'
import apiUrl from '~/modules/api-url'

/**
 * @typedef Tokens
 * @type {Object}
 * @property {string} accessToken
 * @property {string} refreshToken
 */

export default class Auth {
  /**
   * @returns {Promise<boolean>}
   */
  static isSignedIn() {
    if (!this.getAccessToken()) {
      return new Promise((resolve) => {
        resolve(false)
      })
    }

    return new Promise((resolve) => {
      Axios({
        ...apiUrl.user.isSignedIn,
        headers: {
          accessToken: `${this.getAccessToken()}`
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
              refreshToken: `${this.getRefreshToken()}`
            }
          })
            .then((res) => {
              // Successfully refreshed the tokens
              const { data } = res
              this.setJwt(data.accessToken, data.refreshToken)
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
   * @returns {string}
   */
  static getAccessToken() {
    const tokens = this.getJwt()
    if (tokens) {
      return tokens.accessToken
    } else {
      return undefined
    }
  }

  /**
   * @returns {string}
   */
  static getRefreshToken() {
    const tokens = this.getJwt()
    if (tokens) {
      return tokens.refreshToken
    } else {
      return undefined
    }
  }

  /**
   * Get JWT object containing both access token and refresh token
   * @returns {Tokens}
   */
  static getJwt() {
    return JSON.parse(localStorage.getItem('tokens'))
  }

  /**
   * @param {string} accessToken
   */
  static setAccessToken(accessToken) {
    const tokens = this.getJwt()
    tokens.accessToken = accessToken
    localStorage.setItem('tokens', JSON.stringify(tokens))
  }

  /**
   * @param {string} refreshToken
   */
  static setRefreshToken(refreshToken) {
    const tokens = JSON.parse(localStorage.getItem('tokens'))
    tokens.refreshToken = refreshToken
    localStorage.setItem('tokens', JSON.stringify(tokens))
  }

  /**
   * @param {string} accessToken
   * @param {string} refreshToken
   */
  static setJwt(accessToken, refreshToken) {
    const tokens = {
      accessToken,
      refreshToken
    }
    localStorage.setItem('tokens', JSON.stringify(tokens))
  }

  static clearJwt() {
    localStorage.removeItem('tokens')
  }
}
