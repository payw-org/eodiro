import ApiHost from './api-host'
import useAxios from '~/modules/use-axios'

export default class AuthApi {
  /**
   * @param {Http} http
   * @returns {Promise<boolean>}
   */
  static async isSignedIn(http) {
    const [err] = await useAxios(
      {
        method: 'post',
        url: ApiHost.getUrl('auth/is-signed-in')
      },
      {
        withHeader: true,
        http
      }
    )

    return !err
  }

  /**
   * @typedef {Object} Tokens
   * @property {string} accessToken
   * @property {string} refreshToken
   *
   * @param {string} portalId
   * @param {string} password
   * @returns {Promise<Tokens|false>}
   */
  static async signIn(portalId, password) {
    const [err, res] = await useAxios({
      method: 'post',
      url: ApiHost.host + '/auth/sign-in',
      data: { portalId, password }
    })

    return err ? false : res.data
  }

  /**
   * @param {string} portalId
   * @param {string} nickname
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  static async signUp(portalId, nickname, password) {
    portalId = portalId.toLowerCase().trim()
    nickname = nickname.trim().replace(' ', '')

    if (
      !(await this.validatePortalId(portalId)) ||
      !(await this.validateNickname(nickname)) ||
      !(await this.validatePassword(password))
    ) {
      return false
    }

    const [err] = await useAxios({
      method: 'post',
      url: ApiHost.host + '/auth/sign-up',
      data: {
        portalId: portalId + '@cau.ac.kr',
        password,
        nickname
      }
    })

    return !err
  }

  /**
   * @param {string} portalId
   * @returns {Promise<boolean>}
   */
  static async validatePortalId(portalId) {
    if (!portalId) {
      return false
    }

    portalId += '@cau.ac.kr'

    const [err] = await useAxios({
      method: 'post',
      url: ApiHost.host + '/auth/validate/portal-id',
      data: {
        portalId
      }
    })

    return !err
  }

  static async validateNickname(nickname) {
    if (!nickname) {
      return false
    }

    const [err] = await useAxios({
      method: 'post',
      url: ApiHost.host + '/auth/validate/nickname',
      data: {
        nickname
      }
    })

    return !err
  }

  static async validatePassword(password) {
    if (!password) {
      return false
    }

    const [err] = await useAxios({
      method: 'post',
      url: ApiHost.host + '/auth/validate/password',
      data: {
        password
      }
    })

    return !err
  }

  /**
   * @param {Http} http
   * @returns {Promise<Tokens|false>}
   */
  static async refreshTokens(http) {
    const [err, res] = await useAxios(
      {
        method: 'post',
        url: ApiHost.getUrl('auth/refresh-token')
      },
      {
        withHeader: true,
        http
      }
    )

    return err ? false : res.data
  }
}
