import University from 'Database/models/university'
import EmptyFacilityController from 'Controller/EmptyFacilityController'
import logger from 'Configs/log'
import { UniversityDoc } from 'Database/schemas/university'
import { BuildingDoc } from 'Database/schemas/building'
import { FloorDoc } from 'Database/schemas/floor'

interface FloorInfo {
  number: string
}

interface FloorEmptyInfo extends FloorInfo {
  empty_classroom: number
  total_classroom: number
}

export default class FloorListMiddleware {
  public async getList(
    vendor: string,
    building_num: string
  ): Promise<FloorInfo[]> {
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
      select: 'number floors -_id',
      match: { number: building_num },
      populate: {
        path: 'floors',
        select: 'number -_id'
      }
    })

    let building

    // if not found
    if (!university) {
      return Promise.reject('university not found')
    }

    if (!university.buildings[0]) {
      return Promise.reject('building not found')
    }
    building = <BuildingDoc>university.buildings[0]

    if (building.floors.length == 0) {
      return Promise.reject('floors not found')
    }

    building.floors.sort((a: FloorDoc, b: FloorDoc) => {
      let int_a = this.floorToInt(a.number)
      let int_b = this.floorToInt(b.number)

      return int_a > int_b ? -1 : int_a < int_b ? 1 : 0
    })

    const floor_list: FloorInfo[] = []

    building.floors.forEach((floor: FloorDoc) => {
      floor_list.push({
        number: floor.number
      })
    })

    return Promise.resolve(floor_list)
  }

  public async getListIncludeEmptyNum(
    vendor: string,
    building_num: string
  ): Promise<FloorEmptyInfo[]> {
    const university = <UniversityDoc>await University.findOne(
      { vendor: vendor },
      { _id: 0, buildings: 1 }
    ).populate({
      path: 'buildings',
      select: 'number floors -_id',
      match: { number: building_num },
      populate: {
        path: 'floors',
        select: 'number classrooms -_id'
      }
    })

    let building

    // if not found
    if (!university) {
      return Promise.reject('university not found')
    }

    if (!university.buildings[0]) {
      return Promise.reject('building not found')
    }
    building = <BuildingDoc>university.buildings[0]

    if (building.floors.length == 0) {
      return Promise.reject('floors not found')
    }

    building.floors.sort((a: FloorDoc, b: FloorDoc) => {
      let int_a = this.floorToInt(a.number)
      let int_b = this.floorToInt(b.number)

      return int_a > int_b ? -1 : int_a < int_b ? 1 : 0
    })

    const empty_controller = new EmptyFacilityController()
    const floor_list: FloorEmptyInfo[] = []
    const promise_list: Promise<boolean>[][] = []

    building.floors.forEach((floor: FloorDoc, index) => {
      promise_list[index] = []

      floor.classrooms.forEach((classroom_id: string) => {
        promise_list[index].push(
          empty_controller.isClassroomEmpty(classroom_id)
        )
      })

      floor_list.push({
        number: floor.number,
        empty_classroom: 0,
        total_classroom: promise_list[index].length
      })
    })

    const async_promise_list: Promise<boolean[]>[] = []

    for (let i = 0; i < promise_list.length; i++) {
      async_promise_list[i] = Promise.all(promise_list[i])
    }

    let empty_lists = await Promise.all(async_promise_list)
    empty_lists.forEach((empty_list, index) => {
      empty_list.forEach(is_empty => {
        if (is_empty) {
          floor_list[index].empty_classroom++
        }
      })
    })

    return Promise.resolve(floor_list)
  }

  private floorToInt(floor: string): number {
    if (floor.substr(0, 1) == 'B') {
      return -parseInt(floor.substr(1))
    } else {
      return parseInt(floor)
    }
  }
}
