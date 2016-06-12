/**
 * @author JerryC
 * @date  16/6/7
 * @description
 */
'use strict';

var foo = function (name) {
  this.name = name;
};

foo.prototype.name = 'foo';
foo.prototype.age = 18;

var bar = function () {
};

var newFoo = new foo('bar');
bar.prototype = newFoo;
console.log(newFoo);  // -> { name: 'bar' }

var user = new bar();

console.log(user);  // -> {}
console.log(user.name);   // -> bar
console.log(user.age);    // -> 18

/**
 * 总结
 * 1.
 */
