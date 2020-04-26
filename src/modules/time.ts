import dayjs from 'dayjs'

export default class Time {
  static friendly(time: Date | string): string {
    if (!time) return ''

    let postedAt = dayjs(time).format('YYYY. MM. DD. HH:mm')

    const now = dayjs()
    const atObj = dayjs(time)

    const secDiff = now.diff(atObj, 'second')
    if (secDiff < 10) {
      postedAt = '방금'
      return postedAt
    } else if (secDiff < 60) {
      postedAt = `${secDiff}초 전`
      return postedAt
    } else {
      const minDiff = now.diff(atObj, 'minute')
      if (minDiff > 0 && minDiff < 60) {
        postedAt = `${minDiff}분 전`
        return postedAt
      } else {
        const hourDiff = now.diff(atObj, 'hour')
        if (hourDiff > 0 && hourDiff < 24) {
          postedAt = `${hourDiff}시간 전`
          return postedAt
        } else if (now.year() === atObj.year()) {
          return dayjs(time).format('MM/DD HH:mm')
        }
      }
    }

    return postedAt
  }

  static yyyymmdd(date: string, pretty?: boolean): string {
    if (pretty) {
      return dayjs(date).format('YYYY년 M월 D일')
    } else {
      return dayjs(date).format('YYYY-MM-DD')
    }
  }

  static yyyymmddhhmmss(date: string, pretty?: boolean): string {
    if (pretty) {
      return dayjs(date).format('YYYY년 M월 D일 HH:mm:ss')
    } else {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }

  static day(indexOrTime: string): string
  static day(indexOrTime: number): string
  static day(indexOrTime: number | string): string {
    const daysKr = ['일', '월', '화', '수', '목', '금', '토']

    let index = 0

    if (typeof indexOrTime === 'number') {
      index = indexOrTime
    } else if (typeof indexOrTime === 'string') {
      index = dayjs(indexOrTime).day()
    }

    return daysKr[index]
  }
}
