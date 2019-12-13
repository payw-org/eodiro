import Axios from 'axios'
import dayjs from 'dayjs'
import apiUrl from '~/modules/api-url'
import EodiroCookie from '~/modules/cookie'

export default class Auth {
  /**
   * @param {Http=} http
   * @returns {Promise<boolean>}
   */
  static isSignedIn(http) {
    if (!this.getAccessToken(http)) {
      return new Promise((resolve) => {
        resolve(false)
      })
    }

    return new Promise((resolve) => {
      Axios({
        ...apiUrl.user.isSignedIn,
        headers: {
          accessToken: `${this.getAccessToken(http)}`
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
              refreshToken: `${this.getRefreshToken(http)}`
            }
          })
            .then((res) => {
              // Successfully refreshed the tokens
              const { data } = res
              this.setJwt(data.accessToken, data.refreshToken, http)
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
   * @param {Http=} http
   * @returns {string}
   */
  static getAccessToken(http) {
    const tokens = this.getTokens(http)
    return tokens ? tokens.accessToken : undefined
  }

  /**
   * @param {Http=} http
   * @returns {string}
   */
  static getRefreshToken(http) {
    const tokens = this.getTokens(http)
    return tokens ? tokens.refreshToken : undefined
  }

  /**
   * Get JWT object containing both access token and refresh token
   * @param {Http=} http
   * @returns {Tokens}
   */
  static getTokens(http) {
    const eodiroCookie = new EodiroCookie(http)
    return eodiroCookie.get('tokens')
  }

  /**
   * @param {string} accessToken
   * @param {string} refreshToken
   * @param {Http=} http
   */
  static setJwt(accessToken, refreshToken, http) {
    const eodiroCookie = new EodiroCookie(http)
    const tokens = {
      accessToken,
      refreshToken
    }
    eodiroCookie.set('tokens', tokens, {
      expires: dayjs()
        .add(30, 'day')
        .toDate(),
      path: '/'
    })
  }

  /**
   * @param {Http=} http
   */
  static clearJwt(http) {
    const eodiroCookie = new EodiroCookie(http)
    eodiroCookie.remove('tokens')
  }
}
