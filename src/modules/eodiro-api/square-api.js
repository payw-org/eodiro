import ApiHost from './api-host'
import useAxios from '~/modules/use-axios'

export default class SquareApi {
  static async getRecentPosts(from) {
    const [err, res] = await useAxios({
      method: 'get',
      url: ApiHost.host + '/pepero-square/posts/recent',
      params: { from }
    })

    if (err) {
      return false
    } else {
      return res.data
    }
  }

  /**
   * @param {number} from
   * @param {number=} quantity
   * @returns {Promise<Object|false>}
   */
  static async getPosts(from, quantity) {
    const [err, res] = await useAxios({
      method: 'get',
      url: ApiHost.host + '/pepero-square/posts',
      params: {
        from,
        quantity
      }
    })

    if (err) {
      return false
    } else {
      return res.data
    }
  }
}
