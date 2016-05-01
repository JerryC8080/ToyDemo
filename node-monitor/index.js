const http = require("http");
const Monitor = require("monitor");

Monitor.start();

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
}).listen(3000);