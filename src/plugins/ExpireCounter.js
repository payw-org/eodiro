export default class ExpireCounter {
  constructor(classOfFloor) {
    this.classOfFloor = classOfFloor
  }

  /**
   * return room state about roomId atDate
   * roomState.nextClassName = String
   * roomState.expireTime = number (minutes)
   * roomState.expireTimeLevel = nubmer (level per 30 minutes)
   * @param {number} roomId
   * @param {Date} atDate
   */
  run(roomId, atDate) {
    const roomState = {}
    let classOfRoom
    const classOfRoomOnDay = []
    let atDateByValue = null

    // get class array in room
    this.classOfFloor.forEach(function(item) {
      if (item.number === roomId) {
        classOfRoom = item.lectures
      }
    })

    // get class array on the day
    const day = this.parseDayNumberToDay(atDate.getDay())
    classOfRoom.forEach(function(item) {
      if (item.time.day === day) {
        classOfRoomOnDay.push(item)
      }
    })

    // sort classOfRoom
    classOfRoomOnDay.sort((classA, classB) => {
      const valueOfA = this.parseClassTimeToValue(classA.time.start)
      const valueOfB = this.parseClassTimeToValue(classB.time.start)
      return valueOfA - valueOfB
    })

    // make atTime hour-minute-second to second
    atDateByValue =
      atDate.getHours() * 3600 + atDate.getMinutes() * 60 + atDate.getSeconds()

    // get next class and assign roomState property
    for (let i = 0; i < classOfRoomOnDay.length; i++) {
      const item = classOfRoomOnDay[i]

      if (atDateByValue < this.parseClassTimeToValue(item.time.end)) {
        // class is up coming
        if (atDateByValue < this.parseClassTimeToValue(item.time.start)) {
          roomState.nextClassName = item.name
          roomState.expireTime =
            (this.parseClassTimeToValue(item.time.start) - atDateByValue) / 60
          roomState.expireTimeLevel = parseInt(roomState.expireTime / 15)
          break
        } else {
          // class is now
          roomState.nextClassName = item.name
          roomState.expireTime =
            (this.parseClassTimeToValue(item.time.end) - atDateByValue) / 60
          roomState.expireTimeLevel = -1
          break
        }
      }
    }

    return roomState
  }

  /**
   * classTime's form is "##:##"
   * return time to second
   * @param {String} classTime
   */
  parseClassTimeToValue(classTime) {
    return (
      parseInt(classTime.substr(0, 2)) * 3600 +
      parseInt(classTime.substr(2, 2) * 60)
    )
  }

  /**
   * parser number To Day {"Sun","Mon", ...}
   * @param {number} dayNumber
   */
  parseDayNumberToDay(dayNumber) {
    if (dayNumber === 0) {
      return 'SUN'
    }
    if (dayNumber === 1) {
      return 'MON'
    }
    if (dayNumber === 2) {
      return 'TUE'
    }
    if (dayNumber === 3) {
      return 'WED'
    }
    if (dayNumber === 4) {
      return 'THU'
    }
    if (dayNumber === 5) {
      return 'FRI'
    }
    if (dayNumber === 6) {
      return 'SAT'
    }

    return 'Error-Day'
  }
}
