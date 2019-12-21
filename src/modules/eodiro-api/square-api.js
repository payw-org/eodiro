import ApiHost from '~/modules/eodiro-api/api-host'
import useAxios from '~/modules/use-axios'
import Api from '~/modules/eodiro-api/api'

export default class SquareApi extends Api {
  /**
   * @param {number} from
   */
  async getRecentPosts(from) {
    if (from === undefined) {
      return false
    }

    const [err, res] = await useAxios({
      method: 'get',
      url: ApiHost.host + '/pepero-square/posts/recent',
      params: { from }
    })

    return err ? false : res.data
  }

  /**
   * @param {number} from
   * @param {number=} quantity
   * @returns {Promise<Array|false>}
   */
  async getPosts(from, quantity) {
    const [err, res] = await useAxios({
      method: 'get',
      url: ApiHost.host + '/pepero-square/posts',
      params: {
        from,
        quantity
      }
    })

    return err ? false : res.data
  }

  /**
   * @param {number} postId
   * @returns {Promise<Array|false>}
   */
  async getPostItem(postId) {
    const [err, res] = await useAxios(
      {
        method: 'get',
        url: ApiHost.host + '/pepero-square/post',
        params: { postId }
      },
      {
        withHeader: true,
        http: this.http
      }
    )

    return err ? false : res.data
  }

  /**
   * @param {number} postId
   * @param {number} fromId
   * @returns {Promise<Array|false>}
   */
  async getComments(postId, fromId) {
    const [err, res] = await useAxios(
      {
        method: 'get',
        url: ApiHost.getUrl('pepero-square/posts/comments'),
        params: {
          postId,
          fromId
        }
      },
      {
        withHeader: true,
        http: this.http
      }
    )

    return err ? false : res.data
  }

  /**
   * @param {Http} http
   */
  setHttp(http) {
    this.http = http
    return this
  }
}
