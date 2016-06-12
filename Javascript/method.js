/**
 * @author JerryC
 * @date  16/6/5
 * @description
 */
'use strict';

var foo = function () {

};

Function.prototype.say = function (name) {
  console.log('hello', name);
};

Number.say('jec');

String.say('jc');

console.log(Number.prototype.say);

console.log(foo.prototype.constructor);