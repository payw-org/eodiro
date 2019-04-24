phantom.casperPath = './node_modules/casperjs';
phantom.injectJs('./node_modules/casperjs/bin/bootstrap.js');
 
var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
    viewportSize: {width: 1280, height: 800}
});

//URL 및 로그인 정보 변수
var url = "http://everytime.kr/timetable";
var id = "ckdwo3030";
var password = "roothwang13";

casper.start();

casper.open(url);

// Form.Submit
casper.then(function(){
  casper.fill("#container form",{
    userid: id,
    password: password
  }, true);
});

// 로그인 후 수행
casper.then(function(){
    if(casper.exists('#tableName')){
        console.log("-tableName is not exist");
        var getName = casper.evaluate(function(){
            return document.querySelector("#tableName").innerText;
        });
        console.log("Time table : " + getName);
    }
    else{
        console.log("-tableName is not exist");
    }
});

// 버튼 클릭
casper.then(function(){
    if(casper.exists('.search')){
        casper.click('.search');
        console.log("CLICK");
    }
    else{
        console.log("-Failed to click");
    }
});


// 클릭 후에 실행
casper.then(function(){
    this.wait(3000, function(){
        if(casper.exists('.list')){
            console.log("-list is exist");
            var td = casper.evaluate(function(){
                return document.querySelector('.list table tbody tr').children[7].innerText;
                
            });
            console.log("Class room : " + td);
        }
        else{
            casper.capture("list-none.png", {
                top:0, left:0, width:1280, height: 800
            });
            console.log("-list is not exist");
        }
    });
});


casper.then(function(){
    this.wait(6000, function(){
        casper.capture("capture.png", {
            top:0, left:0, width:1280, height: 800
        });
        console.log("-Captured");
    });
});

casper.then(function(){
    console.log("-end");
});

casper.run();