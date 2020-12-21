import { LectureWithMajorCode } from '@/types'

export const getSyllabusUrl = (lecture: LectureWithMajorCode) => {
  const yaer = lecture.year

  let shtm = lecture.semester

  if (lecture.semester === '하계') {
    shtm = 'S'
  } else if (shtm === '동계') {
    shtm = 'W'
  } else {
    shtm = lecture.semester
  }

  const campCd = lecture.campus === '서울' ? 1 : 2
  const lectureCodeSplitted = lecture.code.split('-')
  const sbjtNo = lectureCodeSplitted[0]
  const clssNo = lectureCodeSplitted[1]
  const sust = lecture.major_code || '30000'

  return `https://rpt80.cau.ac.kr/oz80/ozhViewer2.jsp?ozr_path=TIS/prof/usk&ozr_nm=pUskLei008&param_odi=year=${yaer},shtm=${shtm},camp_cd=${campCd},sust=${sust},sbjt_no=${sbjtNo},clss_no=${clssNo}&param_form=`
}
