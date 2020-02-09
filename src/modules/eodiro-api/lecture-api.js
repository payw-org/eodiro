import ApiHost from '~/modules/eodiro-api/api-host'
import useAxios from '~/modules/use-axios'
import Api from '~/modules/eodiro-api/api'

export default class LectureApi extends Api {
  /**
   * @param {Object} options
   * @param {number} options.year
   * @param {string} options.semester
   * @param {string} options.campus
   */
  async getLectures(options) {
    const { year, semester, campus } = options
    const [err, res] = await useAxios({
      method: 'get',
      url: ApiHost.getUrl(`${year}/${semester}/${campus}/lectures`),
    })

    return err ? false : res.data
  }
}
