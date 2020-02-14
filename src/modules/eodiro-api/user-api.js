import ApiHost from './api-host'
import useAxios from '~/modules/use-axios'
import Auth from '~/modules/auth'

export default class {
  /**
   * @param {Http=} http
   * @returns {Promise<Object|false>}
   */
  async getUserInfo(http) {
    const accessToken = Auth.getAccessToken(http)

    const [err, res] = await useAxios({
      method: 'get',
      url: ApiHost.host + '/auth/information',
      headers: {
        accesstoken: accessToken,
      },
    })

    return err ? false : res.data
  }

  /**
   * @param {Object} payload
   * @param {Http=} payload.http
   * @param {number} payload.amount
   * @param {number} payload.offset
   */
  async myPosts(payload) {
    const { amount, offset, http } = payload
    const [err, res] = await useAxios(
      {
        method: 'get',
        url: ApiHost.getUrl('/my/posts'),
        params: {
          amount,
          offset,
        },
      },
      {
        requireAuth: true,
        http,
      }
    )

    return err ? false : res.data
  }
}
