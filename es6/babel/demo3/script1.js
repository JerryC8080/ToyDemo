var babel = require("babel-core");

var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['es2015']
  })
  .code;

console.log("es6Code:");
console.log(es6Code);
console.log("es5Code:");
console.log(es5Code);