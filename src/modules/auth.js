import dayjs from 'dayjs'
import EodiroCookie from '~/modules/cookie'
import { AuthApi } from '~/modules/eodiro-api'

export default class Auth {
  /**
   * @param {Http=} http
   * @returns {Promise<boolean>}
   */
  static async isSignedIn(http) {
    if (!this.getAccessToken(http)) {
      return false
    }

    const isSignedIn = await AuthApi.isSignedIn(http)
    if (isSignedIn) {
      return true
    }

    const tokens = await AuthApi.refreshTokens(http)
    if (!tokens) {
      return false
    }

    this.setJwt(tokens.accessToken, tokens.refreshToken, http)

    return true
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
