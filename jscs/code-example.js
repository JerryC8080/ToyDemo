const v8 = require('v8');
const http = require('http');

function showV8() {
  console.log(v8.getHeapStatistics());
}

http.createServer((req, res) => {
  showV8();
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
}).listen(3000);