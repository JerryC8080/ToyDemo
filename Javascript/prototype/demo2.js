/**
 * @author JerryC
 * @date  16/6/7
 * @description
 */
'use strict';

var foo = function () {
  console.log('I am foo');
};

new foo();  // -> I am foo

console.log(foo.prototype.constructor);   // -> [Function]

foo.prototype.constructor = function () {
  console.log('I am foo');
};

new foo();    // -> I am foo

console.log(foo.prototype.hasOwnProperty('constructor'));   // -> true

/**
 * 总结:
 * 1. 一个函数新建的时候, 会运行类似这样的代码 this.prototype = {constructor: this}
 * 2. 该constructor是属于prototype的属性,但是不能修改.
 */