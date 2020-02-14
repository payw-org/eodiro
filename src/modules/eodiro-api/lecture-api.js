import ApiHost from '~/modules/eodiro-api/api-host'
import useAxios from '~/modules/use-axios'
import Api from '~/modules/eodiro-api/api'

export default class LectureApi extends Api {
  async getCoverages() {
    const [err, res] = await useAxios({
      method: 'get',
      url: ApiHost.getUrl('/lectures/coverages'),
    })

    return err ? false : res.data
  }

  /**
   * @param {Object} options
   * @param {number} options.year
   * @param {string} options.semester
   * @param {string} options.campus
   * @param {number} options.amount
   * @param {number} options.offset
   */
  async getLectures(options) {
    const { year, semester, campus, amount, offset } = options
    const [err, res] = await useAxios({
      method: 'get',
      url: ApiHost.getUrl(`${year}/${semester}/${campus}/lectures`),
      params: {
        amount,
        offset,
      },
    })

    return err ? false : res.data
  }

  /**
   * @param {Object} options
   * @param {number} options.year
   * @param {string} options.semester
   * @param {string} options.campus
   * @param {number} options.amount
   * @param {number} options.offset
   * @param {string} options.query
   */
  async searchLectures(options) {
    const { year, semester, campus, amount, offset, query } = options
    const [err, res] = await useAxios({
      method: 'get',
      url: ApiHost.getUrl(`${year}/${semester}/${campus}/lectures/search`),
      params: {
        amount,
        offset,
        q: query,
      },
    })

    return err ? false : res.data
  }
}
