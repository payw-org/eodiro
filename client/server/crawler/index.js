
module.exports.run = function(){
    const express = require('express');
    const router = express.Router();

    const cheerio = require('cheerio');
    const request = require('request');
//    const Iconv = require('iconv').Iconv;
//    const iconv = new Iconv('CP949', 'utf-8//translit//ignore');   

//    router.get("/crawlingTest", function(req, res, next){
    let url = "https://everytime.kr/timetable";

    request(url, function(error, response, body){
//        let htmlDoc = iconv.convert(body).toString();
        const $ = cheerio.load(body);

//        const $ = cheerio.load(htmlDoc);
        let colArr = $(".time")

        let resultArr = [];
        for(let i = 0; i < colArr.length; i++){
            resultArr.push(colArr[i].text());
        }
        console.log(colArr);
        console.log(resultArr);
        console.log(body);
    });
    
//    })
}