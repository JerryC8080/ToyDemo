/**
 * @author JerryC
 * @date  16/5/29
 * @description
 */
'use strict';
let obj;
let say = function () {
  console.log(this.name);
};

obj = {
  name: 'jc',
  say: say,
  boy: {
    say: say.bind()
  }
};

obj.boy.say = say.bind(obj);

obj.say();
obj.boy.say();