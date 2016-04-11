var memwatch = require('memwatch-next');
var hd = new memwatch.HeapDiff();

var leakArray = [];
var leak = function () {
  leakArray.push('leak:' + Math.random());
}

for (var index = 0; index < 50000; index++) {
  leak();
}

var diff = hd.end();
console.log(JSON.stringify(diff, null, 2));
