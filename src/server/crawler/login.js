module.exports.login = function(){

    const phantom = require('phantom');

    (async function() {
        const instance = await phantom.create();
        const page = await instance.createPage();
/*      
        await page.on('onResourceRequested', function(requestData) {
        console.info('Requesting', requestData.url);
        });
*/
        console.log("-Requesting context");
        const status = await page.open('https://everytime.kr/timetable/');
        await console.log("-" + status);
        const content = await page.property('plainText');
//        await console.log(content);

        await instance.exit();
        console.log('end');        
    })();
}
