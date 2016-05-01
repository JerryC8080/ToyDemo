'use strict';

const server = require("net").createServer();

server.on('connection', (socket) => {
  console.log('handler by one');
  socket.end('handler by one');
});

server.on('connection', (socket) => {
  console.log('handler by two');
  socket.end('handler by two');
});

server.on('connection', (socket) => {
  console.log('handler by three');
  socket.end('handler by three');
});

server.listen(1337, () => {
  console.log('server start');
});

