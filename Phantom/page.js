/**
 * @author JerryC
 * @date  16/6/1
 * @description
 */
'use strict';
var page = require('webpage').create();
page.open('http://example.com', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('example.png');
  }
  phantom.exit();
});