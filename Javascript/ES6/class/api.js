/**
 * @author JerryC
 * @date  16/5/29
 * @description
 */
'use strict';

module.exports = function () {
  const _this = this;
  return {
    foo: (lastName) => {
      console.log(_this.firstName + lastName);
    }
  }
};