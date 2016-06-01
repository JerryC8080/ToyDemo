/**
 * @author JerryC
 * @date  16/5/29
 * @description
 */
'use strict';

class A {
  constructor(firstName) {
    this.firstName = firstName;
    this.api = require('./api').apply(this);
    this.bar = require('./middleware').bar;
  }
}

let a = new A('huang');

a.api.foo('jerryc');
a.bar('jc');


