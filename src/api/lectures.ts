import ApiHost from '@/modules/api-host'
import eodiroFetch from '@/modules/eodiro-fetch'
import getSemester from '@/modules/get-semester'
import { Campus, LecturesWithMajorCode, Semester } from '@/types'
import dayjs from 'dayjs'
import queryString from 'query-string'

export class LecturesApi {
  static async lectures(options: {
    year?: number
    semeseter?: Semester
    campus: Campus
    amount?: number
    offset: number
  }): Promise<LecturesWithMajorCode | null> {
    const now = dayjs()
    const year = options?.year ?? now.year()
    const semeseter = encodeURIComponent(options?.semeseter ?? getSemester())
    const campus = encodeURIComponent(options.campus)
    const { amount, offset } = options

    const [err, data] = await eodiroFetch<LecturesWithMajorCode>(
      `${ApiHost.getHost()}/lectures/${year}/${semeseter}/${campus}/list?${queryString.stringify(
        {
          amount,
          offset,
        }
      )}`
    )

    return err ? null : data
  }

  static async search(
    query = '',
    options: {
      year?: number
      semeseter?: Semester
      campus: Campus
      amount?: number
      offset: number
    }
  ): Promise<LecturesWithMajorCode | null> {
    const now = dayjs()
    const year = options?.year ?? now.year()
    const semeseter = encodeURIComponent(options?.semeseter ?? getSemester())
    const campus = encodeURIComponent(options.campus)
    const q = query
    const { amount, offset } = options

    const [err, data] = await eodiroFetch<LecturesWithMajorCode>(
      `${ApiHost.getHost()}/lectures/${year}/${semeseter}/${campus}/search?${queryString.stringify(
        {
          q,
          amount,
          offset,
        }
      )}`
    )

    return err ? null : data
  }
}
