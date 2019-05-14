
export default class ExpireCounter{
  constructor(classOfFloor){
    this.classOfFloor = classOfFloor;
  }

  /**
   * return room state about roomId atDate
   * roomState.nextClassName = String
   * roomState.expireTime = number (minutes)
   * roomState.expireTimeLevel = nubmer (level per 30 minutes)
   * @param {number} roomId 
   * @param {Date} atDate 
   */
  run(roomId, atDate){
    var roomState = new Object;
    var classOfRoom;
    var classOfRoomOnDay = new Array;
    var atDateByValue;
    var i;

    
    // get class array in room
    this.classOfFloor.forEach(function(item,index){
      if(item['number'] == roomId)
        classOfRoom = item['lectures'];
    });

    // get class array on the day
    var day = this.parseDayNumberToDay(atDate.getDay());
    classOfRoom.forEach(function(item,index){
      if(item['time']['day'] == day){
        classOfRoomOnDay.push(item);
      }
    });

    console.log(classOfRoomOnDay);
    // sort classOfRoom
    classOfRoomOnDay.sort((classA,classB) =>{
      var valueOfA = this.parseClassTimeToValue(classA['time']['start']);
      var valueOfB = this.parseClassTimeToValue(classB['time']['start']);
      return valueOfA-valueOfB;
    });
    console.log(classOfRoomOnDay);

    // make atTime hour-minute-second to second
    atDateByValue = atDate.getHours()*3600 + atDate.getMinutes()*60 + atDate.getSeconds();

    // get next class and assign roomState property
    for(i=0; i<classOfRoomOnDay.length; i++){
      let item = classOfRoomOnDay[i];
      
      if( atDateByValue < this.parseClassTimeToValue(item['time']['end'])){
        // class is up coming
        if( atDateByValue < this.parseClassTimeToValue(item['time']['start'])){
          roomState.nextClassName = item['name'];
          roomState.expireTime = (this.parseClassTimeToValue(item['time']['start']) - atDateByValue)/60;
          roomState.expireTimeLevel = parseInt(roomState.expireTime/30);
          break;
        }
        // class is now
        else{
          roomState.nextClassName = item['name'];
          roomState.expireTime = (atDateByValue - this.parseClassTimeToValue(item['time']['end']))/60;
          roomState.expireTimeLevel = -1;
          break;
        }
      } 
    }

    return roomState;
  }

  /**
   * classTime's form is "##:##"
   * return time to second
   * @param {String} classTime 
   */
  parseClassTimeToValue(classTime){
      return parseInt(classTime.substr(0,2))*3600 + parseInt(classTime.substr(2,2)*60);
  }

  /**
   * parser number To Day {"Sun","Mon", ...}
   * @param {number} dayNumber 
   */
  parseDayNumberToDay(dayNumber){
      if(dayNumber == 0)
          return "SUN"
      if(dayNumber == 1)
          return "MON"
      if(dayNumber == 2)
          return "TUE"
      if(dayNumber == 3)
          return "WED"
      if(dayNumber == 4)
          return "THU"
      if(dayNumber == 5)
          return "FRI"
      if(dayNumber == 6)
          return "SAT"
      
      return "Error-Day"
  }
}