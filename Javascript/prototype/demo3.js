/**
 * @author JerryC
 * @date  16/6/7
 * @description
 */
'use strict';

var foo = function () {

};

foo.prototype.name = 'foo';

var bar = new foo();

console.log(bar.prototype);   // -> undefined

console.log(bar.name);    // -> foo

/**
 * 总结:
 * 1. 实例,并不能显示的访问其原型
 * 2. 当实例访问一个不存在实例所在内存块的属性时,会自动寻找原型中的对应属性.
 */