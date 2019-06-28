import University from 'Database/models/university'
import { UniversityDoc } from 'Database/schemas/university'
import logger from 'Configs/log'
import { BuildingDoc } from 'Database/schemas/building'
import { FloorDoc } from 'Database/schemas/floor'
import { ClassroomDoc } from 'Database/schemas/classroom'
import { TimeDoc } from 'Database/schemas/time'
import { LectureDoc } from 'Database/schemas/lecture'
import { ClassDoc } from 'Database/schemas/class'

interface LectureInfo {
  name: string
  instructor: string
  time: TimeDoc
}

interface ClassroomInfo {
  number: string
  lectures: LectureInfo[]
}

export default class ClassroomListMiddleware {
  public async getList(
    vendor: string,
    building_num: string,
    floor_num: string
  ): Promise<ClassroomInfo[]> {
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
        select: 'number classrooms -_id',
        match: { number: floor_num },
        populate: {
          path: 'classrooms',
          select: 'number lectures -_id',
          options: { sort: { number: 1 } },
          populate: {
            path: 'lectures',
            select: 'class order -_id',
            populate: {
              path: 'class',
              select: 'name instructor times.day times.start times.end -_id'
            }
          }
        }
      }
    })

    let building, floor

    // if not found
    if (!university) {
      return Promise.reject('university not found')
    }

    if (!university.buildings[0]) {
      return Promise.reject('building not found')
    }
    building = <BuildingDoc>university.buildings[0]

    if (!building.floors[0]) {
      return Promise.reject('floor not found')
    }
    floor = <FloorDoc>building.floors[0]

    if (floor.classrooms.length == 0) {
      return Promise.reject('classrooms not found')
    }

    let lecture_list: LectureInfo[]
    const classroom_list: ClassroomInfo[] = []

    floor.classrooms.forEach((classroom: ClassroomDoc) => {
      lecture_list = []
      classroom.lectures.forEach((lecture: LectureDoc) => {
        lecture_list.push({
          name: (<ClassDoc>lecture.class).name,
          instructor: (<ClassDoc>lecture.class).instructor,
          time: (<ClassDoc>lecture.class).times[lecture.order]
        })
      })

      lecture_list.sort((a, b) => {
        const day_num: { [index: string]: number } = {
          MON: 0,
          TUE: 1,
          WED: 2,
          THU: 3,
          FRI: 4,
          SAT: 5,
          SUN: 6
        }

        return day_num[a.time.day] > day_num[b.time.day]
          ? 1
          : day_num[a.time.day] < day_num[b.time.day]
          ? -1
          : a.time.start > b.time.start
          ? 1
          : -1
      })

      classroom_list.push({
        number: classroom.number,
        lectures: lecture_list
      })
    })

    return Promise.resolve(classroom_list)
  }
}
