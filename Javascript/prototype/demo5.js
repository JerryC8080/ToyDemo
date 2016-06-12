/**
 * @author JerryC
 * @date  16/6/7
 * @description
 */
'use strict';

var foo = function () {
  return 'I am foo';
};

var bar = function () {
  return 'I am bar';
};

bar.prototype = new foo();

var user = new bar();

console.log(user.constructor());  // -> I am foo

bar.prototype.constructor = bar;

var user2 = new bar();

console.log(user2.constructor());   // -> I am bar

/**
 * 总结
 * 1. 在执行new bar()的时候,会执行 new foo(),所以 bar.prototype.constructor 会被覆盖.
 * 2. prototype.constructor 可以被改回来.
 */