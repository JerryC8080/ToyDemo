/**
 * @author JerryC
 * @date  16/5/29
 * @description
 */
'use strict';

function f(y) {
  return this.x + y;
}



class A {
  constructor(){
    this.x = 10;
    this.firstName = 'huang';
    this.bar = f.bind(this);
    this.foo = require('./middleware').bar.bind(this);
  }
}

let o = new A();
console.log(o.bar(2)); // 3
o.foo('jc');