var Inliner = require('inliner');
var inliner = new Inliner('http://remysharp.com');

inliner.on('progress', function (event) {
  console.error(event);
}).on('end', function (html) {
  // compressed and inlined HTML page
  console.log(html);
});