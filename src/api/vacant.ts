import ApiHost from '@/modules/api-host'
import eodiroFetch from '@/modules/eodiro-fetch'
import getSemester from '@/modules/get-semester'
import { Campus, Semester, Year } from '@/types'
import dayjs from 'dayjs'

export type VacantBuildings = {
  building_number: number
  total: number
  empty: number
}[]

export type Lecture = {
  name: string
  professor: string
  start_h: number
  start_m: number
  end_h: number
  end_m: number
}

export type VacantClassrooms = {
  classroom_number: string
  lectures: Lecture[]
}[]

export class VacantApi {
  static async buildings({
    year,
    semester,
    campus,
  }: {
    year: Year
    semester: Semester
    campus: Campus
  }): Promise<VacantBuildings | null> {
    const now = dayjs()
    const sanitizedYear = year || now.year()
    const sanitizedSemester = semester || getSemester()

    const [err, data] = await eodiroFetch(
      `${ApiHost.getHost()}/vacant/${sanitizedYear}/${encodeURIComponent(
        sanitizedSemester
      )}/${encodeURIComponent(campus)}/buildings`,
      {
        method: 'get',
      }
    )

    return err ? null : data
  }

  static async classrooms({
    year,
    semester,
    campus,
    building,
  }: {
    year?: Year
    semester?: Semester
    campus: Campus
    building: string
  }): Promise<VacantClassrooms | null> {
    const now = dayjs()
    const sanitizedYear = year || now.year()
    const sanitizedSemester = semester || getSemester()

    // TODO: Rename `useFetch` because it's not a React hook
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [err, data] = await eodiroFetch(
      `${ApiHost.getHost()}/vacant/${sanitizedYear}/${encodeURIComponent(
        sanitizedSemester
      )}/${encodeURIComponent(campus)}/buildings/${building}/classrooms`,
      {
        method: 'get',
      }
    )

    return err ? null : data
  }
}
