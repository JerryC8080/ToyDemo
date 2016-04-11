var memwatch = require('memwatch-next');
memwatch.on('leak', function (info) {
  console.log('leak:');
  console.log(info);  
});

memwatch.on('stats', function (stats) {
  console.log('stats:');
  console.log(stats);  
});

var http = require('http');
var leakArray = [];
var leak = function () {
  leakArray.push('leak:' + Math.random());
}

http.createServer(function (req, res) {    
  leak();
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
}).listen(1337);