var http = require('http');
var leakArray = [];
var leak = function () {
  leakArray.push('leak:' + Math.random());
}

var fs = require('fs');
// (see note below)
setInterval(function takeSnapshot() {
  var mem = process.memoryUsage();
  fs.appendFile('./memorysnapshot.numbers', mem.rss / 1024 / 1024 + '\t'
    + mem.heapUsed / 1024 / 1024 + '\t' + mem.heapTotal / 1024 / 1024 + '\n', 'utf8');
}, 1000); // Snapshot every second


http.createServer(function (req, res) {    
  leak();
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
}).listen(1337);