'use strict';
const cluster = require("cluster");
if (cluster.isMaster) {
  let worker = cluster.fork('./worker.js');  
  console.log('Master: my pid is ', process.pid);
  console.log('Master: worker pid is ', worker.process.pid);  
  worker.process.mProcess = process;
}

if (cluster.isWorker) {
  console.log('Worker: my pid is ', process.pid);
  console.log('Worker: master pid is: ', process.mProcess.pid);
}