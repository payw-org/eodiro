function parseWithA(src,A){
    var tempOfSplit = src.split(A);
    var temp;
    var result = new Array;
    var i;

    for(i=0; i<tempOfSplit.length-1;i++){
        temp = tempOfSplit[i].substr(tempOfSplit[i].length-3,tempOfSplit[i].length);
        if(parseInt(temp) >= 0)
            result.push(temp+A);
    }
    return result;
}

function parseW(src){
    var result = new Array;
    var gwan = new Array;
    var ho = new Array;
    var 요일 = new Array;
    var temp;
    temp = src.split(' ');

    temp.forEach(function(item,index){
        if(item.substr(item.length-1,item.length) == "관"){
            gwan.push(item);
        }
        else if(item.substr(item.length-1,item.length) == "호"){
            ho.push(item);
        }
        else if(item.substr(0,1) == "일" ||
                item.substr(0,1) == "월" ||
                item.substr(0,1) == "화" ||
                item.substr(0,1) == "수" ||
                item.substr(0,1) == "목" ||
                item.substr(0,1) == "금" ||
                item.substr(0,1) == "토" ){
            요일.push(item);
        }
    });
    ho.forEach(function(item, index){
        ho[index] = gwan[index%gwan.length] + " " + item;
    });
    result.push(ho);
    result.push(요일);
    return result;
}

var temp = parseW("303관(법학관) 404호 화5,6 / 310관 727호 수1");
console.log(temp); 