/**
 * phantom-script.js
 */
"use strict";
// Example using HTTP POST operation in PhantomJS
// This website exists and is for test purposes, dont post sensitive information
var page = require('webpage').create(),
    server = 'http://everytime.kr/';

    var webPage = require('webpage');
    var page = webPage.create();
    var postBody = 'user=username&password=password';

    
    page.open(server, 'POST', postBody, function(status) {
      console.log('Status: ' + status);
      
    });