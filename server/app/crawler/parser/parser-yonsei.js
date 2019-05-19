var app_path = "/home/bitnami/app/dev-hcj";

var data_scrap = require(app_path + "/server/resources/scrap/scrap-yonsei.json");
// var data_scrap = require(app_path + "/server/resources/scrap/scrap_고려대 서울캠_0.json");
/**
 * Index    title       usage
 * 0        계획서      
 * 1        학년        
 * 2        종별        
 * 3        학정번호    true
 * 4        학점        
 * 5        교과목명    true
 * 6        담당교수    true
 * 7        강의시간    true
 * 8        강의실      true
 * 9        강의평
 */

function testData(data_scrap){
    let temp;
    for(let i=0; i<data_scrap.length; i++){
        temp = data_scrap[i]['강의실'];
        if(temp != "")
            console.log(temp);
        // temp = data_scrap[i]['강의시간/강의실'];
        temp = temp.replace(/(?:[A-z]|)\d\d\d(?:-\d|)(?:[A-z]|)/g,"");
        temp = temp.replace(/\(.*\)/g,"");
        if(temp != "")
            console.log(">"+temp);
    }
}

function parseToLocations(src){
    let locations = new Array;
    let location;
    let gwan,ho;
    let hoRegEx = /(?:[A-z]|)\d\d\d(?:-\d|)/g;
    let gwanRegEx = /(.*)(?:\(\1\)|)/g;
    let parenthesisRegEx = /(.*)/g;

    // get ho array
    ho = hoRegEx.exec(src);
    
    // remove ho from src
    src = src.replace(hoRegEx,"");

    // remove (.*)
    src = src.replace(parenthesisRegEx,"");

    // get 
    gwan = gwanRegEx.exec(src);

    return locations;
}

testData(data_scrap);
return ;

let classInfo;
let data_scrap_unit;
for(let i=0; i<data_scrap.length; i++){
    data_scrap_unit = data_scrap[i];

    classInfo.class_id = data_scrap_unit['학정번호'];   // done.
    classInfo.name = data_scrap_unit['교과목명'];       // done.
    classInfo.instructor = data_scrap_unit['담당교수']; // done.
    classInfo.locations = data_scrap_unit['강의실'];    
    classInfo.times = data_scrap_unit['강의시간'];

}

