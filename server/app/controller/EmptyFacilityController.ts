import Classroom from 'Database/models/classroom'
import { ClassroomDoc } from 'Database/schemas/classroom'
import { TimeDoc } from 'Database/schemas/time'
import { LectureDoc } from 'Database/schemas/lecture'
import { ClassDoc } from 'Database/schemas/class'

interface CurrentDate {
  day: string
  time: string
}

export default class EmptyFacilityController {
  public async isClassroomEmpty(classroom_id: string): Promise<boolean> {
    const classroom: ClassroomDoc = <ClassroomDoc>await Classroom.findById(
      classroom_id,
      {
        _id: 0,
        lectures: 1
      }
    ).populate({
      path: 'lectures',
      select: 'class order -_id',
      populate: {
        path: 'class',
        select: 'times -_id'
      }
    })

    const time_list: TimeDoc[] = []
    classroom.lectures.forEach((lecture: LectureDoc) => {
      time_list.push((<ClassDoc>lecture.class).times[lecture.order])
    })

    let is_empty = true
    let curr_date = this.get_current_time()

    for (let i = 0; i < time_list.length; i++) {
      if (time_list[i].day == curr_date.day) {
        if (
          time_list[i].start <= curr_date.time &&
          time_list[i].end >= curr_date.time
        ) {
          is_empty = false
          break
        }
      }
    }

    return Promise.resolve(is_empty)
  }

  private get_current_time(): CurrentDate {
    const local_date = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
    )

    let day = local_date
      .toString()
      .split(' ')[0]
      .toUpperCase()
    let hour = local_date
      .getHours()
      .toString()
      .padStart(2, '0')
    let min = local_date
      .getMinutes()
      .toString()
      .padStart(2, '0')

    return { day: day, time: hour + min }
  }
}
