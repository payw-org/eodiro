import University from 'Database/models/university'
import EmptyFacilityController from 'Controller/EmptyFacilityController'
import logger from 'Configs/log'
import { UniversityDoc } from 'Database/schemas/university'
import { BuildingDoc } from 'Database/schemas/building'
import { FloorDoc } from 'Database/schemas/floor'

interface BldgInfo {
  number: string
  name: string
}

interface BldgEmptyInfo extends BldgInfo {
  empty_classroom: number
  total_classroom: number
}

export default class BuildingListMiddleware {
  public async getList(
    vendor: string,
    language: string = 'ko'
  ): Promise<BldgInfo[]> {
    const university = <UniversityDoc>await University.findOne(
      { vendor: vendor },
      { _id: 0, buildings: 1 },
      err => {
        if (err) {
          logger.error(err)
        }
      }
    ).populate({
      path: 'buildings',
      select: 'number name floors -_id',
      options: { sort: { number: 1 } }
    })

    // if not found
    if (!university) {
      return Promise.reject('university not found')
    }

    if (university.buildings.length == 0) {
      return Promise.reject('buildings not found')
    }

    const building_list: BldgInfo[] = []

    university.buildings.forEach((building: BuildingDoc) => {
      if (building.floors.length != 0) {
        building_list.push({
          number: building.number,
          name: building.name[language]
        })
      }
    })

    return Promise.resolve(building_list)
  }

  public async getListIncludeEmptyNum(
    vendor: string,
    language: string = 'ko'
  ): Promise<BldgEmptyInfo[]> {
    const university = <UniversityDoc>await University.findOne(
      { vendor: vendor },
      { _id: 0, buildings: 1 },
      err => {
        if (err) {
          logger.error(err)
        }
      }
    ).populate({
      path: 'buildings',
      select: 'number name floors -_id',
      options: { sort: { number: 1 } },
      populate: {
        path: 'floors',
        select: 'classrooms -_id'
      }
    })

    // if not found
    if (!university) {
      return Promise.reject('university not found')
    }

    if (university.buildings.length == 0) {
      return Promise.reject('buildings not found')
    }

    const empty_controller = new EmptyFacilityController()
    const building_list: BldgEmptyInfo[] = []
    const promise_list: Promise<boolean>[][] = []

    university.buildings.forEach((building: BuildingDoc) => {
      if (building.floors.length != 0) {
        promise_list.push([])

        building.floors.forEach((floor: FloorDoc) => {
          floor.classrooms.forEach((classroom_id: string) => {
            promise_list[promise_list.length - 1].push(
              empty_controller.isClassroomEmpty(classroom_id)
            )
          })
        })

        building_list.push({
          number: building.number,
          name: building.name[language],
          empty_classroom: 0,
          total_classroom: promise_list[promise_list.length - 1].length
        })
      }
    })

    const async_promise_list: Promise<boolean[]>[] = []

    for (let i = 0; i < promise_list.length; i++) {
      async_promise_list[i] = Promise.all(promise_list[i])
    }

    let empty_lists = await Promise.all(async_promise_list)
    empty_lists.forEach((empty_list, index) => {
      empty_list.forEach(is_empty => {
        if (is_empty) {
          building_list[index].empty_classroom++
        }
      })
    })

    return Promise.resolve(building_list)
  }
}
