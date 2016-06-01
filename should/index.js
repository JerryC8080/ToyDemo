/**
 * @author JerryC
 * @date  16/5/30
 * @description
 */
'use strict';
const should = require('should');
function foo() {
  throw new Error('foo');
}

describe("test", () => {
  it("test", () => {
    (function(){ throw new Error('fail') }).should.throw();
    (function(){ throw new Error('fail') }).should.throw('fail');
    (function () {
      foo();
    }).should.throw('foo')
  });
});