import { Lecture } from '@payw/cau-timetable-scraper-types'

export type Year = number
export type Semester = '1' | '하계' | '2' | '동계'
export type Campus = '서울' | '안성'

// Lectures
export type LectureWithMajorCode = Lecture & {
  major_code: string
}
export type LecturesWithMajorCode = LectureWithMajorCode[]
