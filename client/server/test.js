
function parseIntToTime(src){ // parse int to time (##:00)
    src = src + 8;
    if(src < 10)
        src = "0" + src;
    src = src + ":00";
    return src.toString();
}

function mergeTimes(src){// 같은요일에 다른 강의실을 쓰는 경우는 없다고 가정
    var tempOfTime = new Array;
    var startOfTime = ""
    var endOfTime = "";
    var day = "";

    src.forEach(function(item, index){ // time integration

        if(day != item.substr(0,1) ){    // new day of week
            day = item.substr(0,1);
            startOfTime = item.substr(0,7); // include 'day' and '~'
        }

        if( index == src.length-1 ||    // the last item
            day != src[index+1].substr(0,1) ||  // the last item in same day of week
            (   day == src[index+1].substr(0,1) && // the last time in time
                parseInt(src[index].substr(1,2)) >= parseInt(src[index+1].substr(1,2)) ) 
            ){ 
            endOfTime = item.substr(7,5);
            tempOfTime.push(startOfTime + endOfTime);
            day = "";
        }
    });
    return tempOfTime;
}

function mergeRooms(ho,gwan){
    ho.forEach(function(item, index){
        if(gwan[index%gwan.length] == null || item == null)
            return null;
        ho[index] = gwan[index%gwan.length] + " " + item;
    });
    return ho;
}

function duplicateRoom(room,time){
    var numOfRoom = room.length;
    var numOfTime = time.length;
    var i;
    for(i=0; i< numOfTime - numOfRoom; i++){
        room.push(room[numOfRoom-1]);
    }
    return room;
}

function parseClassRoom_Time(src){
    var result = new Array;
    var gwan = new Array;
    var ho = new Array;
    var time = new Array;
    var num;
    var tempOfTime;
    var tempOfRoom;
    var partOfTimeInt;
    var temp;
    var day;
    if((temp = src.match(/\d\d\d관/g) ) != null){
        temp.forEach(function(item,index){
            tempOfRoom = item;
            gwan.push(tempOfRoom);
        });
    }
    if((temp = src.match(/\d\d\d호|\d\d\d-\d호/g) ) != null){
        if(temp.length >= 2)
            console.log(temp.length);
        temp.forEach(function(item,index){
            tempOfRoom = item;
            ho.push(tempOfRoom);
        });
    }

    if( (temp = src.match(/[월화수목금토일]\d\d:\d\d~\d\d:\d\d/g) ) != null){
        temp.forEach(function(item, index){
            day = /[월화수목금토일]/.exec(item)[0];
            src.replace(item,day+" "+/\d\d:\d\d~\d\d:\d\d/.exec(item)[0]);
        });
    }

    if( (temp = src.match(/[월화수목금토일]\d+(?:,\d+)*/g) ) != null){
        console.log(temp);
        temp.forEach(function(item,index){ // 월1,2,3
            day = /[월화수목금토일]/.exec(item)[0];
            item = item.split(',');
            item.forEach(function(item2,index){ // 월1 2 3
                partOfTimeInt = parseInt(/\d+/.exec(item2)[0]);
                tempOfTime = day + parseIntToTime(partOfTimeInt) +"~"+ parseIntToTime(partOfTimeInt+1); // 월09:00~10:00 ...
                time.push(tempOfTime);
            });
        });
    }

    if( (temp = src.match(/[월화수목금토일].\d\d:\d\d~\d\d:\d\d/g) ) != null){
        temp.forEach(function(item,index){
            day = /[월화수목금토일]/.exec(item)[0];
            tempOfTime = item.replace(/[월화수목금토일]./,day);
            time.push(tempOfTime);
        });
    }



    ho = mergeRooms(ho,gwan);
    time = mergeTimes(time);
    ho = duplicateRoom(ho,time);
    
    result.push(ho);
    result.push(time);
    return result;
}

var a = parseClassRoom_Time("310관 102호 103호 월1,2,3 수1,2 ");
console.log(a);