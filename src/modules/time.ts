import dayjs from 'dayjs'

/**
 * @deprecated
 */
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
    }
    if (secDiff < 60) {
      postedAt = `${secDiff}초 전`
      return postedAt
    }
    const minDiff = now.diff(atObj, 'minute')
    if (minDiff > 0 && minDiff < 60) {
      postedAt = `${minDiff}분 전`
      return postedAt
    }
    const hourDiff = now.diff(atObj, 'hour')
    if (hourDiff > 0 && hourDiff < 24) {
      postedAt = `${hourDiff}시간 전`
      return postedAt
    }
    if (now.year() === atObj.year()) {
      return dayjs(time).format('MM/DD HH:mm')
    }

    return postedAt
  }

  static yyyymmdd(date: string, pretty?: boolean): string {
    if (pretty) {
      return dayjs(date).format('YYYY년 M월 D일')
    }
    return dayjs(date).format('YYYY-MM-DD')
  }

  static yyyymmddhhmmss(date: string | Date, pretty?: boolean): string {
    if (pretty) {
      return dayjs(date).format('YYYY년 M월 D일 HH:mm:ss')
    }
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
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

export const dbNow = () => dayjs().add(9, 'hour').toDate()
export const dbTime = (time: Date) => dayjs(time).add(9, 'hour').toDate()

const isPrimitive = (test: any) => test !== Object(test)

export function friendlyTime(time: Date | string): string {
  if (!time) return ''

  let postedAt = dayjs(time).format('YYYY. MM. DD.')

  const now = dayjs()
  const atObj = dayjs(time)

  const secDiff = now.diff(atObj, 'second')
  if (secDiff < 60) {
    postedAt = `방금`
    return postedAt
  }
  const minDiff = now.diff(atObj, 'minute')
  if (minDiff > 0 && minDiff < 60) {
    postedAt = `${minDiff}분 전`
    return postedAt
  }
  const hourDiff = now.diff(atObj, 'hour')
  if (hourDiff > 0 && hourDiff < 24) {
    postedAt = `${hourDiff}시간 전`
    return postedAt
  }
  const dayDiff = now.diff(atObj, 'day')
  if (dayDiff > 0 && dayDiff < 30) {
    if (dayDiff === 1) {
      return '어제'
    }
    postedAt = `${dayDiff}일 전`
    return postedAt
  }
  // TODO: monthly diff
  const yearDiff = now.diff(atObj, 'year')
  if (yearDiff < 1) {
    postedAt = dayjs(time).format('MM/DD HH:mm')
    return postedAt
  }

  return postedAt
}

export function yyyymmddhhmm(date: string | Date, pretty?: boolean): string {
  if (pretty) {
    return dayjs(date).format('YYYY년 M월 D일 HH:mm')
  }
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

function subtract9Hours(obj: Record<string, unknown>) {
  if (!obj) return

  for (const key of Object.keys(obj)) {
    const val = obj[key]
    if (val instanceof Date) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = dayjs(val).subtract(9, 'hour').toDate()
    } else if (!isPrimitive(val)) {
      subtract9Hours(val as any)
    }
  }
}

// Subtract 9 hours from all the Date objects
export function prismaTimeMod<T>(value: T): T {
  if (value instanceof Date) {
    return dayjs(value).subtract(9, 'hour').toDate() as any
  }

  if (isPrimitive(value)) {
    return value
  }

  subtract9Hours(value as any)

  return value
}

function flattenTime(obj: Record<string, unknown>) {
  if (!obj) return

  for (const key of Object.keys(obj)) {
    const val = obj[key]
    if (val instanceof Date) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = val.toUTCString()
    } else if (!isPrimitive(val)) {
      flattenTime(val as any)
    }
  }
}

export const stringifyTime = <T>(value: T): T => {
  if (value instanceof Date) {
    return value.toUTCString() as any
  }
  if (isPrimitive(value)) {
    return value
  }
  flattenTime(value as any)

  return value
}
