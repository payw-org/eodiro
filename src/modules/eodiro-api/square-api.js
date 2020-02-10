import ApiHost from '~/modules/eodiro-api/api-host'
import useAxios from '~/modules/use-axios'
import Api from '~/modules/eodiro-api/api'

export default class SquareApi extends Api {
  /**
   * @param {number} from
   */
  async getRecentPosts(from) {
    const [err, res] = await useAxios({
      method: 'get',
      url: ApiHost.host + '/pepero-square/posts/recent',
      params: { from },
    })

    return err ? false : res.data
  }

  /**
   * @param {number} from
   * @param {number=} quantity
   * @returns {Promise<Array|null>}
   */
  async getPosts(from, quantity) {
    const [err, res] = await useAxios({
      method: 'get',
      url: ApiHost.host + '/pepero-square/posts',
      params: {
        from,
        quantity,
      },
    })

    return err ? null : res.data
  }

  /**
   * @param {number} postId
   * @returns {Promise<Array|null>}
   */
  async getPostItem(postId) {
    const [err, res] = await useAxios(
      {
        method: 'get',
        url: ApiHost.host + '/pepero-square/post',
        params: { postId },
      },
      {
        requireAuth: true,
        http: this.http,
      }
    )

    return err ? null : res.data
  }

  /**
   * @typedef {Object} PostData
   * @property {string} title
   * @property {string} body
   *
   * @param {PostData} postData
   * @returns {number} Inserted post ID
   */
  async addPost({ title, body }) {
    const [err, res] = await useAxios(
      {
        method: 'post',
        url: ApiHost.getUrl('pepero-square/post'),
        data: {
          title,
          body,
        },
      },
      {
        requireAuth: true,
      }
    )

    return err ? false : res.data.postId
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
        url: ApiHost.getUrl('pepero-square/post/comments'),
        params: {
          postId,
          fromId,
        },
      },
      {
        requireAuth: true,
        http: this.http,
      }
    )

    return err ? false : res.data
  }

  /**
   * @typedef {Object} AddCommentData
   * @property {number} postId
   * @property {string} body
   *
   * @param {AddCommentData} addCommentData
   */
  async addComment({ postId, body }) {
    const [err] = await useAxios(
      {
        method: 'post',
        url: ApiHost.getUrl('pepero-square/post/comment'),
        data: {
          body,
          postId,
        },
      },
      {
        requireAuth: true,
      }
    )

    return !err
  }
}
