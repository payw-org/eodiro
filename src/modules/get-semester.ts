import { Semester } from '@/types'
import dayjs from 'dayjs'

const getSemester = (date: Date = new Date()): Semester => {
  const now = dayjs(date)
  const month = now.month() + 1
  const nowDate = now.date()
  const nextSemesterThresholdDate = 20

  let semester: Semester

  if (
    (month === 12 && nowDate > nextSemesterThresholdDate) ||
    month === 1 ||
    (month === 2 && nowDate <= nextSemesterThresholdDate)
  ) {
    semester = '동계'
  } else if (
    (month === 2 && nowDate > nextSemesterThresholdDate) ||
    month === 3 ||
    month === 4 ||
    month === 5 ||
    (month === 6 && nowDate <= nextSemesterThresholdDate)
  ) {
    semester = '1'
  } else if (
    (month === 6 && nowDate > nextSemesterThresholdDate) ||
    month === 7 ||
    (month === 8 && nowDate <= nextSemesterThresholdDate)
  ) {
    semester = '하계'
  } else if (
    (month === 8 && nowDate > nextSemesterThresholdDate) ||
    month === 9 ||
    month === 10 ||
    month === 11 ||
    (month === 12 && nowDate <= nextSemesterThresholdDate)
  ) {
    semester = '2'
  }

  return semester
}

export default getSemester
