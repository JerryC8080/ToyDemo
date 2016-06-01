/**
 * @author JerryC
 * @date  16/6/1
 * @description
 */
'use strict';
var webPage = require('webpage');
var page = webPage.create();
//page.settings.resourceTimeout = 3000;

try{
  page.open('http://phantomjs.org', function (status) {
    var content = page.content;
    console.log('Content: ' + content);
    phantom.exit();
  });

  page.onResourceTimeout = function(request) {
    console.log('Response (#' + request.id + '): ' + JSON.stringify(request));
  };

}catch(error){
  console.log(error);
  phantom.exit();
}



