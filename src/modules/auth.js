import dayjs from 'dayjs'
import EodiroCookie from '~/modules/cookie'
import { AuthApi } from '~/modules/eodiro-api'

export default class Auth {
  /**
   * Verify access token from server
   * then refresh tokens if it is necessary.
   *
   * @param {Http=} http
   * @returns {Promise<boolean>}
   */
  static async isSignedInRefresh(http) {
    // Verify from the server if tokens exists
    // It may fail due to 2 reasons
    // 1. No access token on the device
    // 2. Access token has been expired
    const authApi = new AuthApi(http)
    const isSignedIn = await authApi.isSignedIn()
    if (isSignedIn) {
      this.updateLastlySignedInVerificationTime()
      return true
    }

    // It will fail when refresh token has been expired
    const tokens = await authApi.refreshTokens()
    if (!tokens) {
      this.signedInFlag = false
      this.lastlySignedInVerificationTime = null
      return false
    }

    // Set tokens with refreshed ones
    this.setJwt(tokens.accessToken, tokens.refreshToken, http)
    this.updateLastlySignedInVerificationTime()

    return true
  }

  /**
   * Shallow check if an user is signed in
   * by looking at the application-wide static flag.
   */
  static isSignedInQuick() {
    return this.signedInFlag
  }

  /**
   * @param {Http} http
   * @returns {Promise<boolean>}
   */
  static async isSignedInCritical(http) {
    if (!this.isSignedInQuick() || !this.lastlySignedInVerificationTime) {
      return false
    }

    if (this.lastlySignedInVerificationTime.diff(dayjs().minute() > 60)) {
      const result = await this.isSignedInRefresh(http)
      return result
    } else {
      return this.isSignedInQuick()
    }
  }

  static updateLastlySignedInVerificationTime() {
    this.lastlySignedInVerificationTime = dayjs()
    this.signedInFlag = true
  }

  /**
   * @param {Http=} http
   * @returns {string|null}
   */
  static getAccessToken(http) {
    const tokens = this.getTokens(http)
    return tokens ? tokens.accessToken : null
  }

  /**
   * @param {Http=} http
   * @returns {string|null}
   */
  static getRefreshToken(http) {
    const tokens = this.getTokens(http)
    return tokens ? tokens.refreshToken : null
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
  static async setJwt(accessToken, refreshToken, http) {
    const tokens = {
      accessToken,
      refreshToken,
    }

    await new EodiroCookie(http).set('tokens', tokens, {
      expires: dayjs()
        .add(30, 'day')
        .toDate(),
      path: '/',
    })

    this.updateLastlySignedInVerificationTime()
    this.signedInFlag = true
  }

  /**
   * @param {Http=} http
   */
  static clearJwt(http) {
    const eodiroCookie = new EodiroCookie(http)
    eodiroCookie.remove('tokens')

    this.lastlySignedInVerificationTime = null
    this.signedInFlag = false
  }
}

Auth.lastlySignedInVerificationTime = null
Auth.signedInFlag = false
