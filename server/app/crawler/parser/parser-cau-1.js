var app_path = "/home/bitnami/app/dev-hcj";
var data_vender = "cau-1";

var data_scrap = require(app_path + "/server/resources/scrap/scrap_중앙대_1.json");
/**
 * Index    title          usage
 * 0        학년      
 * 1        이수구분         
 * 2        과목번호-분반   true        
 * 3        과목명          true
 * 4        담당교수        true
 * 5        학점
 * 6        시간
 * 7        강의실/강의시간 true  
 * 8        강의평          
 * 9        담은인원
 * 10       개설학과
 * 11       유의사항
 */

/**
 * 
 * @param {JSON} src 
 * @param {String} title 
 */
function createFile(src,title){
    src = JSON.stringify(src);
    var fs = require('fs');
    fs.writeFileSync(app_path+"/server/resources/"+title, src,  { encoding: 'utf8', flag: "w" });
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
    return "ErrorDay";
}

function parseIntToTime(num){
    if(num<10)
        num = "0" + num + "30";
    else
        num = num + "30";
    return num;
}

function testData(data_scrap){
    let temp;
    for(let i=0; i<data_scrap.length; i++){
        temp = data_scrap[i]['강의시간/강의실'];

        if(temp != ""){
            console.log(temp);
            temp = temp.match(/\(\d\d?-\d\d?\)|\(\d\d?\)/g);
            console.log(">" + temp);
        }
        console.log("");
    }   
}

function parseToLocations(src){
    let result = new Object;
    let locations = new Array;
    let srcOrigin = src;
    let error = false;

    let location;
    let gwan,ho;

    let hoRegEx = /\d\d\d(?:-\d|)(?=(?:-\d)|호)/g;
    let gwanRegEx = /^\d\d\d(?=관)/g;

    // get ho array
    ho = src.match(hoRegEx);
    
    // remove ho from src
    src = src.replace(hoRegEx,"");

    // get gwan array
    gwan = src.match(gwanRegEx);

    // remove gwan from src
    src = src.replace(gwanRegEx,"");

    if(gwan != null && ho != null){
        // match gwan with ho
        if(ho.length == gwan.length && ho.length != 0 && gwan.length != 0){
            for(let i=0; i<ho.length; i++){
                if(gwan[i] == "805")
                    gwan[i] = "805-806";
                location = new Object;
                location.building = gwan[i];
                location.room = ho[i];
                locations.push(location);
            }
        }
        else if(ho.length > gwan.length && ho.length != 0 && gwan.length != 0){
            if(ho.length - gwan.length == 1 && gwan.length == 1){
                gwan.push(gwan[0]);
                for(let i=0; i<ho.length; i++){
                    if(gwan[i] == "805")
                        gwan[i] = "805-806";
                        
                    location = new Object;
                    location.building = gwan[i];
                    location.room = ho[i];
                    locations.push(location);
                }
            }
        }
        else{
            error = true;
        }
    }
    else{
        console.log(gwan + " " + ho);
        error = true;
    }


    result.locations = locations;
    result.srcOrigin = srcOrigin;
    result.rest = src;
    result.error = error;

    return result;
}

function parseToTimes(src){
    let result = new Object;
    let times = new Array;
    let srcOrigin = src;
    let error = false;

    let time;
    let day,number,start,end;

    let numberRegEx = /[월화수목금토일]\d\d?(?:,\d\d?|)*(?!\d)(?!\:)/g;
    let number2RegEx = /[월화수목금토일](?:\(|)\d\d:\d\d~\d\d:\d\d/g;
    let dayRegEx = /[월화수목금토일]/g;
    let startRegEx = /^\d\d?/;
    let start2RegEx = /\d\d:\d\d(?=~)/;
    let endRegEx = /\d\d?$/;
    let end2RegEx = /\d\d:\d\d$/;

    if(src == undefined){
        result.times = times;
        result.srcOrigin = srcOrigin;
        result.rest = src;
        result.error = true;
        return result;
    }

    // get day array
    number = src.match(numberRegEx);

    number2 = src.match(number2RegEx);

    if(number2 != null){
        for(let i=0; i<number2.length; i++){
            time = new Object;

            day = number2[i].match(dayRegEx);
            number2[i] = number2[i].replace(dayRegEx,"");
            start = number2[i].match(start2RegEx);
            start = start[0].replace(":","");
            end = number2[i].match(end2RegEx);
            end = end[0].replace(":","");
            

            time.day = parseDayToDay(day);
            time.start = start;
            time.end = end;
            times.push(time);
        }
    }

    if(number != null){
        for(let i=0; i<number.length; i++){
            time = new Object;

            day = number[i].match(dayRegEx);
            number[i] = number[i].replace(dayRegEx,"");
            start = parseInt(number[i].match(startRegEx),10)+8;
            start = parseIntToTime(start);
            end = parseInt(number[i].match(endRegEx),10)+9;
            end = parseIntToTime(end);

            time.day = parseDayToDay(day);
            time.start = start;
            time.end = end;
            times.push(time);
        }
    }
    
    if(number == null && number2 == null){
        error = true;
    }


    result.times = times;
    result.srcOrigin = srcOrigin;
    result.rest = src;
    result.error = error;

    return result;
}

// testData(data_scrap);
// return ;

let data_parse = new Array;
let data_parse_error = new Array;

let classInfo;
let classInfo_error;
let data_scrap_unit;

let resultOfParse;
let buildings = new Array;
for(let i=0; i<data_scrap.length; i++){
    data_scrap_unit = data_scrap[i];

    // init classInfo
    classInfo = new Object;
    classInfo_error = null;

    classInfo.class_id = data_scrap_unit['과목번호-분반'];   // done.
    classInfo.name = data_scrap_unit['과목명'];             // done.
    classInfo.instructor = data_scrap_unit['담당교수'];     // done.
    
    // parse location
    resultOfParse = parseToLocations(data_scrap_unit['강의실/강의시간']);
    if(resultOfParse.error == false)
        classInfo.locations = resultOfParse.locations;
    else{
        classInfo_error = new Object;
        classInfo_error.srcOrigin = data_scrap_unit['강의실/강의시간'] + 1;
    }

    // parse time
    resultOfParse = parseToTimes(data_scrap_unit['강의실/강의시간']);
    if(resultOfParse.error == false)
        classInfo.times = resultOfParse.times;
    else{
        classInfo_error = new Object;
        classInfo_error.srcOrigin = data_scrap_unit['강의실/강의시간'] + 2;
    }

    // invalid data set
    if(classInfo_error == null && classInfo.times.length < classInfo.locations.length){
        classInfo_error = new Object;
        classInfo_error.srcOrigin = data_scrap_unit['강의실/강의시간'] + 3;
    }
    
    // the number of time is more than location
    if(classInfo_error == null && classInfo.times.length > classInfo.locations.length){
        let diff = classInfo.times.length-classInfo.locations.length;
        for(let i=0; i<diff; i++){
            classInfo.locations.push(classInfo.locations[classInfo.locations.length-1]);
        }

    }

    if(classInfo_error == null){
        data_parse.push(classInfo);
        if(buildings.includes(classInfo.locations[0].building) == false)
            buildings.push(classInfo.locations[0].building);   
    }
    if(classInfo_error != null){
        data_parse_error.push(classInfo_error);
    }
}

createFile(data_parse,"/parse/parse-" + data_vender + ".json");
createFile(data_parse_error,"/parse-debug/parse-" + data_vender + "-error.json");
createFile(buildings,"/parse-debug/buildings-" + data_vender + ".json");