import University from 'Database/models/university'
import logger from 'Configs/log'
import { UniversityDoc } from 'Database/schemas/university'
import { GlobalNameDoc } from 'Database/schemas/global_name'

interface UnivInfo {
  name: GlobalNameDoc
  campus: GlobalNameDoc
  vendor: string
}

export default class UniversityListMiddleware {
  public async getList(language: string = 'ko'): Promise<UnivInfo[]> {
    const universities = <UniversityDoc[]>await University.find(
      {},
      { _id: 0, name: 1, campus: 1, vendor: 1 },
      err => {
        if (err) {
          logger.error(err)
        }
      }
    ).sort([['name.' + language, 1]])

    // if not found
    if (universities.length == 0) {
      return Promise.reject('universities not found')
    }

    const univ_list: UnivInfo[] = []
    universities.forEach(university => {
      univ_list.push({
        name: university.name[language],
        campus: university.campus[language],
        vendor: university.vendor
      })
    })

    return Promise.resolve(univ_list)
  }
}
