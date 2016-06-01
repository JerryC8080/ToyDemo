/**
 * @author JerryC
 * @date  16/6/1
 * @description
 */
'use strict';
var page = require('webpage').create();
var system = require('system');

var url;

if (system.args.length === 1) {
  console.log('Try to pass some args when invoking this script!');
} else {
  url = system.args[1];
}

console.log(url);

page.onResourceRequested = function(request) {
  console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response) {
  console.log('Receive ' + JSON.stringify(response, undefined, 4));
};
page.open(url).catch((error) => {
  console.log(error);
  page.close();
  phantom.exit();
});

page.onError = function(msg, trace) {

  var msgStack = ['ERROR: ' + msg];

  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }

  console.error(msgStack.join('\n'));

};