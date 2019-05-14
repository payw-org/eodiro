var system = require('system');
var app_path = "/home/bitnami/app/dev-hcj";

phantom.casperPath = app_path+'/node_modules/casperjs';
phantom.injectJs(app_path+'/node_modules/casperjs/bin/bootstrap.js');


function createFile(src){
    src = JSON.stringify(src);
    var fs = require('fs');
    fs.write(app_path+"/server/resources/scrap/scrap_" + campus_name + "_" + campus_label + ".json", src, 'w');
}

function waitForClick(casper, selector){
    casper.then(function(){
        casper.waitForSelector(selector,
            function(success){
                casper.click(selector,5,5);
            },
            function(fail){
                console.log(">Error - " + selector + " is not exist.");
            },
            5000);
    });
}
 
var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
    viewportSize: {width: 1280, height: 800}
});

//URL 및 로그인 정보 변수
var url = "http://everytime.kr/timetable";
var id = system.args[1];
var password = system.args[2];
var campus_label = system.args[3]; // 0,1,2
var campus_name;

casper.start(url);


// Form.Submit
casper.then(function(){
  casper.fill("#container form",{
    userid: id,
    password: password
  }, true);
});

// Click to open subject list
waitForClick(casper, '.search');

casper.then(function(){
    casper.wait(3000);
})

// change campus
if(campus_label != 0){
    // click campus
    waitForClick(casper, 'a[data-id=campus]');

    // click second label
    waitForClick(casper, '#subjectCampusFilter div label:nth-child(2)');

    // click submit
    waitForClick(casper, '#subjectCampusFilter input[type=submit]');
}

// wait first class list
casper.then(function(){
    this.waitForSelector('.list table tbody tr',
        function pass(){
            console.log("-class room is exist.");

        },
        function fail(){
            console.log("-class room is not exist.");
        },
        50000
    );
});

var data_scrap = new Array;
var lastTime=0;
var numOfData_temp;
var numOfData = 0;
var currentTime;
casper.waitFor(
    function(){
        // get the number of subjects
        numOfData_temp = casper.evaluate(function(){
            return document.querySelectorAll('.list table tbody tr').length;
        });
        // load new subjects
        casper.evaluate(function(){
            document.querySelector('.list').scrollTop = document.querySelector('.list').scrollHeight;
        });
        // delay for loading new subjects
        currentTime = new Date().getTime()/1000;
        if(numOfData_temp > numOfData){
            numOfData = numOfData_temp;
            lastTime = currentTime;
        }

        else if(lastTime + 10 < currentTime){
            console.log("Data scraped : " + numOfData_temp);
            return true;
        }
    },
    function(){
        var data_head = new Array;
        var data_body;
        var lenOfHead;
        var lenOfBody;
        var resultOfEvaluate;

        // get head
        lenOfHead = casper.evaluate(function(){
            return document.querySelectorAll('.list table thead tr th').length;
        });
        for(var i=0; i<lenOfHead; i++){
            resultOfEvaluate = casper.evaluate(function(i){
                return document.querySelector('.list table thead tr').children[i].children[0].innerText;
            },i)
            data_head.push(resultOfEvaluate);
        }

        // get body
        lenOfBody = casper.evaluate(function(){
            return document.querySelectorAll('.list table tbody tr').length;
        });
        for(var i=0; i<lenOfBody; i++){
            data_body = new Object;
            for(var j=0; j<lenOfHead; j++){
                data_body[data_head[j]] = casper.evaluate(function(i,j){
                    return document.querySelector('.list table tbody').children[i].children[j].innerText;
                },i,j);
            }
            data_scrap.push(data_body);
        }
    },
    function(){
        console.log("-Searching class room is timeout");
    },1000*60*10    // 10 minute
);

// campus_name
campus_name = casper.evaluate(function(){
    return document.querySelector('.subname').innerText;
})

// save
casper.then(function(){
    createFile(data_scrap);
    console.log('-The number of class room is ' + data_scrap.length);
})
casper.run();