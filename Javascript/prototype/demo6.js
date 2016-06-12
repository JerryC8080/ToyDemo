/**
 * @author JerryC
 * @date  16/6/7
 * @description 模拟 new关键字的操作过程
 */
'use strict';

Function.prototype.new = function () {

  // 创建一个对象,它继承自构造器函数的原型对象.
  let that = (function (prototype) {
    let temp = function() {};
    temp.prototype = prototype;
    return new temp();
  })(this.prototype);  // this 指的是构造函数(函数实例对象)

  // 调用构造函数,绑定this到that上.
  let other = this.apply(that, arguments);

  return (typeof other === 'object' && other) || that;
};

var foo = function (name) {
  console.log('i am foo');
  this.name = name;
};

foo.prototype.name = 'foo';
foo.prototype.age = 18;

var bar = foo.new('bar');

console.log(bar);
console.log(bar.name);
console.log(bar.age);
