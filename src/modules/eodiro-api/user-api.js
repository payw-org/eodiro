import ApiHost from './api-host'
import useAxios from '~/modules/use-axios'
import Auth from '~/modules/auth'

export default class {
  /**
   * @param {Http=} http
   * @returns {Promise<Object|false>}
   */
  static async getUserInfo(http) {
    const accessToken = Auth.getAccessToken(http)

    const [err, res] = await useAxios({
      method: 'get',
      url: ApiHost.host + '/auth/information',
      headers: {
        accesstoken: accessToken
      }
    })

    return err ? false : res.data
  }
}
