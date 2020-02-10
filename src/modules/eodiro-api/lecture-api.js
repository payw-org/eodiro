import ApiHost from '~/modules/eodiro-api/api-host'
import useAxios from '~/modules/use-axios'
import Api from '~/modules/eodiro-api/api'

export default class LectureApi extends Api {
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
}
