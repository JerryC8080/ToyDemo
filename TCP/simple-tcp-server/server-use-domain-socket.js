'use strict';

let net = require('net');

// create a tcp server.
let server = net.createServer();

// listenning client connection. 
server.on('connection', function (socket) {
  socket.write('Welcome! boy!');
  
  // when data in , print it and say 'hi' for response.
  socket.on('data', function (data) {
    console.log('something data arrived:', data.toString());
    socket.write('hi!');
  });
  
  // when a client disconnected, tell terminal.
  socket.on('end', function () {
    console.log('a socket disconneted');
  });
});

// running server and listenning port 8124.
server.listen('/tmp/echo.sock');
