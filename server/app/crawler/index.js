phantom.casperPath = '/home/bitnami/app/dev-hcj/node_modules/casperjs';
phantom.injectJs('/home/bitnami/app/dev-hcj/node_modules/casperjs/bin/bootstrap.js');

function parseIntToTime(src){ // parse int to time (##:00)
    src = src + 8;
    if(src < 10)
        src = "0" + src;
    src = src + ":00";
    return src.toString();
}

function parseDayToDay(src){
    if(src == "월")
        return "MON";
    if(src == "화")
        return "TUE";
    if(src == "수")
        return "WED";
    if(src == "목")
        return "THU";
    if(src == "금")
        return "FRI";
    if(src == "토")
        return "SAT";
    if(src == "일")
        return "SUN";
    return "Error";

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
    if((temp = src.match(/(?:[A-z]|)\d\d\d(?:-\d|)호/g) ) != null){
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

    ho.forEach(function(item,index){
        if( /\d\d\d관 (?:[A-z]|)\d\d\d(?:-\d|)호/.test(item) == false){
            console.log(" - Error "+item);
            console.log(time);
            ho = "";
        }
    });
    time.forEach(function(item,index){
        if(/[월화수목금토일]\d\d:\d\d~\d\d:\d\d/.test(item) == false){
            console.log(" - Error "+item);
            console.log(ho);
            time = "";
        } 
    });
    if(ho == null)
        ho = "";
    if(time ==null)
        time = "";
    
    result.push(ho);
    result.push(time);
    return result;
}

function parseToSend(src){
    var newSrc = new Array;
    var course;
    var location;
    var time;
    src.forEach(function(item,index){
        course = new Object;

        course.course_number = item['course_no'];
        course.class_number = item['class_no'];
        course.name = item['name'];
        course.instructor = item['instructor'];

        course.location = new Array;
        item['room'].forEach(function(item2,index){
            location = new Object;
            location.building = /\d\d\d관/.exec(item2)[0].split('관')[0];
            location.room = /[A-z]\d\d\d(?:-\d|)호/.exec(item2)[0].split('호')[0];
            course.location.push(location);
        });

        course.time = new Array;
        item['time'].forEach(function(item2,index){
            time = new Object;
            time.day = parseDayToDay(/[월화수목금토]/.exec(item2)[0]);
            time.start = /\d\d:\d\d~/.exec(item2)[0].split('~')[0];
            time.end = /~\d\d:\d\d/.exec(item2)[0].split('~')[1];
            course.time.push(time);
        });

        newSrc.push(course);
    });
    return newSrc;
}

function createFile(src){
    src = JSON.stringify(src);
    var fs = require('fs');
    fs.write("result.json", src, 'w');
}
 
var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
    viewportSize: {width: 1280, height: 800}
});

//URL 및 로그인 정보 변수
var url = "http://everytime.kr/timetable";
var id = "ckdwo3030";
var password = "roothwang13";

casper.start(url);

// Form.Submit
casper.then(function(){
  casper.fill("#container form",{
    userid: id,
    password: password
  }, true);
});

// Click to open subject list
casper.then(function(){
    casper.waitForSelector(
        '.search',
        function(success){
            casper.click('.search');
        },
        function(fail){
            console.log("-Error - \'.search\' is not exist.");
        },
        10000);
});

// 클릭 후에 실행
casper.then(function(){
    this.waitForSelector('.list table tbody tr',
        function pass(){
            console.log("-class room is exist.");

        },
        function fail(){
            console.log("-class room is not exist.");
        },
        100000
    );
});

var courseArray = new Array;
var numOfClass = 0;
casper.then(function(){
    var time=0;
    var numOfTemp;
    var d;
    var i;

    casper.waitFor(function(){
        // get the number of subjects
        numOfTemp = casper.evaluate(function(){
            return document.querySelectorAll('.list table tbody tr').length;
        });
        // load new subjects
        casper.evaluate(function(){
            document.querySelector('.list').scrollTop = document.querySelector('.list').scrollHeight;
        });
        // delay for loading new subjects
        d = new Date();
        if(numOfTemp > numOfClass){
            numOfClass = numOfTemp;
            time = d.getTime()/1000;
        }

        else if(time + 10 < d.getTime()/1000 || numOfTemp >= 5000){
            console.log(numOfTemp);
            return true;
        }
    },function(){
        var classId_DivNo;
        var classRoom_Time;

        var course;
        var className;
        var classInstructor;
        
        for(i=0;i<numOfClass;i++){
            course = new Object;
            classId_DivNo = casper.evaluate(function(i){
                return document.querySelector('.list table tbody').children[i].children[2].innerText;
            },i);
            className = casper.evaluate(function(i){
                return document.querySelector('.list table tbody').children[i].children[3].innerText;
            },i);
            classInstructor = casper.evaluate(function(i){
                return document.querySelector('.list table tbody').children[i].children[4].innerText;
            },i);
            classRoom = casper.evaluate(function(i){
                return document.querySelector('.list table tbody').children[i].children[7].innerText;
            },i);

            classId_DivNo = classId_DivNo.split('-');
            classRoom_Time = parseClassRoom_Time(classRoom);
            
            course.course_no = classId_DivNo[0];
            course.class_no = classId_DivNo[1];
            course.name = className;
            course.instructor = classInstructor;
            course.room = classRoom_Time[0];
            course.time = classRoom_Time[1];

            if(course.room != "" && course.time != ""){ // 재택강의 제거
                courseArray.push(course);
            }
        }
        courseArray = parseToSend(courseArray);
    
    },function(){
        console.log("-Searching class room is timeout");
    },2000*200);

});

casper.then(function(){

    createFile(courseArray);
    console.log('-The number of class room is ' + numOfClass);

});

casper.then(function(){
    casper.wait(1,function(){
        casper.capture("capture-end.png", {
            top:0, left:0, width:1280, height: 800
        });
        console.log("-Captured");
    });
});

casper.then(function(){
    console.log("-end");
});

casper.run();