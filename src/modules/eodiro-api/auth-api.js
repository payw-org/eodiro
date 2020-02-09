import ApiHost from '~/modules/eodiro-api/api-host'
import useAxios from '~/modules/use-axios'
import Api from '~/modules/eodiro-api/api'

export default class AuthApi extends Api {
  /**
   * Verify the authentication from server using tokens
   *
   * @returns {Promise<boolean>}
   */
  async isSignedIn() {
    const [err, res] = await useAxios(
      {
        method: 'post',
        url: ApiHost.getUrl('auth/is-signed-in'),
      },
      {
        requireAuth: true,
        http: this.http,
      }
    )

    if (err) {
      return false
    }

    const { isSignedIn } = res.data

    return isSignedIn
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
  async signIn(portalId, password) {
    const [err, res] = await useAxios({
      method: 'post',
      url: ApiHost.host + '/auth/sign-in',
      data: { portalId, password },
    })

    return err ? false : res.data
  }

  /**
   * @param {string} portalId
   * @param {string} nickname
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  async signUp(portalId, nickname, password) {
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
        nickname,
      },
    })

    return !err
  }

  /**
   * @param {string} portalId
   * @returns {Promise<boolean>}
   */
  async validatePortalId(portalId) {
    if (!portalId) {
      return false
    }

    portalId += '@cau.ac.kr'

    const [err] = await useAxios({
      method: 'post',
      url: ApiHost.host + '/auth/validate/portal-id',
      data: {
        portalId,
      },
    })

    return !err
  }

  async validateNickname(nickname) {
    if (!nickname) {
      return false
    }

    const [err] = await useAxios({
      method: 'post',
      url: ApiHost.host + '/auth/validate/nickname',
      data: {
        nickname,
      },
    })

    return !err
  }

  async validatePassword(password) {
    if (!password) {
      return false
    }

    const [err] = await useAxios({
      method: 'post',
      url: ApiHost.host + '/auth/validate/password',
      data: {
        password,
      },
    })

    return !err
  }

  /**
   * @returns {Promise<Tokens|false>}
   */
  async refreshTokens() {
    const [err, res] = await useAxios(
      {
        method: 'post',
        url: ApiHost.getUrl('auth/refresh-token'),
      },
      {
        requireAuth: true,
        http: this.http,
      }
    )

    return err ? false : res.data
  }
}
