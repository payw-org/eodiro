var app_path = "/home/bitnami/app/dev-hcj";

var data_scrap = require(app_path + "/server/resources/scrap/scrap_고려대 서울캠_0.json");
/**
 * Index    title          usage
 * 0        계획서      
 * 1        학수번호-분반   true     
 * 2        이수구분        
 * 3        교과목명        true
 * 4        교수            true
 * 5        학점
 * 6        강의시간/강의실 true
 * 7        강의평  
 * 8        담은 인원       
 * 9        비고
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

function parseIntToTime(num){
    if(num<10)
        num = "0" + num + "00";
    else
        num = num + "00";
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
    let gwan,ho,base;

    let hoRegEx = /(?:[A-z]|)\d\d\d(?:[A-z]|)|제\d강의실/g;
    let gwanRegEx = /[가-힣]+(?:관|어|합|과|대)(?:\(.+\)|)(?!\))|L-P/g;
    let baseRegEx = /지하/g;

    // convert 지하 to B
    src = src.replace(/지하 /g,"B");

    // get ho array
    ho = src.match(hoRegEx);
    
    // remove ho from src
    src = src.replace(hoRegEx,"");

    // get gwan array
    gwan = src.match(gwanRegEx);

    // remove gwan from src
    src = src.replace(gwanRegEx,"");

    // get base array
    base = src.match(baseRegEx);

    // remove base from src
    src = src.replace(baseRegEx,"");

    if(gwan != null && ho != null){
        // match base with ho
        if(base != null){
            if(base.length == ho.length){
                for(let i=0; i<ho.length; i++){
                    ho[i] = "B"+ho[i];
                }
            }
            else{
                console.log(ho+base);
                error = true;
            }
        }
        // match gwan with ho
        if(gwan.length == ho.length && ho.length != 0 && gwan.length != 0){
            for(let i=0; i<ho.length; i++){
                location = new Object;
                location.building = gwan[i];
                location.room = ho[i];
                locations.push(location);
            }
        }
        else{
            error = true;
        }
    }
    else{
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

    let dayRegEx = /[월화수목금토일]/g;
    let numberRegEx = /\(\d\d?-\d\d?\)|\(\d\d?\)/g;
    let startRegEx = /\d\d?(?=-)/;
    let endRegEx = /\d\d?(?=\))/;

    // get day array
    day = src.match(dayRegEx);
    
    // remove ho from src
    src = src.replace(dayRegEx,"");

    // get time array
    number = src.match(numberRegEx);

    // remove time from src
    src = src.replace(numberRegEx,"");

    if(day != null && number != null && day.length == number.length){
        for(let i=0; i<number.length; i++){
            time = new Object;
            if(number[i].match(/\d\d?/g).length == 2){   // (\d-\d)
                start = parseInt(number[i].match(startRegEx),10)+8;
                start = parseIntToTime(start);
                end = parseInt(number[i].match(endRegEx),10)+9;
                end = parseIntToTime(end);
            }
            if(number[i].match(/\d\d?/g).length == 1){   // (\d)
                start = parseInt(number[i].match(endRegEx),10)+8;
                start = parseIntToTime(start);
                end = parseInt(number[i].match(endRegEx),10)+9;
                end = parseIntToTime(end);
            }
            time.day = day[i];
            time.start = start;
            time.end = end;
            times.push(time);
        }
    }
    else{
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

    classInfo.class_id = data_scrap_unit['학수번호-분반'];   // done.
    classInfo.name = data_scrap_unit['교과목명'];       // done.
    classInfo.instructor = data_scrap_unit['교수']; // done.
    
    // parse location
    resultOfParse = parseToLocations(data_scrap_unit['강의시간/강의실']);
    if(resultOfParse.error == false)
        classInfo.locations = resultOfParse.locations;
    else{
        classInfo_error = new Object;
        classInfo_error.srcOrigin = data_scrap_unit['강의시간/강의실'];
        classInfo_error.result = resultOfParse.locations;
    }

    // parse time
    resultOfParse = parseToTimes(data_scrap_unit['강의시간/강의실']);
    if(resultOfParse.error == false)
        classInfo.times = resultOfParse.times;
    else{
        classInfo_error = new Object;
        classInfo_error.srcOrigin = data_scrap_unit['강의시간/강의실'];
        classInfo_error.result = resultOfParse.times;
    }
    
    if(classInfo_error == null && classInfo.times.length != classInfo.locations.length){
        classInfo_error = new Object;
        classInfo_error.srcOrigin = data_scrap_unit['강의시간/강의실'];
        classInfo_error.result = "error";
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

createFile(data_parse,"/parse/parse-korea.json");
createFile(data_parse_error,"/parse-debug/parse-korea-error.json");
createFile(buildings,"/parse-debug/buildings.json");