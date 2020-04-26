import { LectureWithMajorCode } from '@/types'

export const getSyllabusUrl = (lecture: LectureWithMajorCode) => {
  const yaer = lecture.year
  const shtm =
    lecture.semester === '하계'
      ? 'S'
      : lecture.semester === '동계'
      ? 'W'
      : lecture.semester
  const camp_cd = lecture.campus === '서울' ? 1 : 2
  const lectureCodeSplitted = lecture.code.split('-')
  const sbjt_no = lectureCodeSplitted[0]
  const clss_no = lectureCodeSplitted[1]
  const sust = lecture.major_code || '30000'

  return `https://rpt80.cau.ac.kr/oz80/ozhViewer2.jsp?ozr_path=TIS/prof/usk&ozr_nm=pUskLei008&param_odi=year=${yaer},shtm=${shtm},camp_cd=${camp_cd},sust=${sust},sbjt_no=${sbjt_no},clss_no=${clss_no}&param_form=`
}
