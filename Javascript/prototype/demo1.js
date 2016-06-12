/**
 * @author JerryC
 * @date  16/6/5
 * @description
 */
'use strict';

var stooge = {
  nickname: 'jerryc',
  age: 18
};

Object.create = function (obj) {
  var F = function () {};
  F.prototype = obj;
  return new F();
};

var another_stooge = Object.create(stooge);
another_stooge['name'] = 'Mike';
another_stooge['nickname'] = 'MikeMike';

// stooge 作为 another_stooge 的原型, 原型的属性只读.
console.log(another_stooge);
console.log(another_stooge.nickname);
console.log(another_stooge.age);

// 当原型的属性改变了,继承这个原型的对象对应的属性也会变.
stooge.age = 20;
console.log(another_stooge.age);

// 这个证明继承原型,是直接继承到内存块的地址,而不是stooge的指针.
// 所以改变stooge指向的内存块,是不会改变anther_stooge的原型指向.
stooge = {age: 21};
console.log(another_stooge.age);

// 原型一旦确定,只有只读的权限,没有办法做更新,删除,获取重新制定原型.
another_stooge.prototype = {agee: 30};
console.log(another_stooge.agee);

var other_stooge = Object.create(another_stooge);
other_stooge['name'] = 'June';

// 所有字面量对象都包含下面的两个方法:
console.log(stooge.toString);
console.log(stooge.constructor);

// stooge.constructor = Object.constructor ??
var from_stooge = stooge.constructor();
console.log(from_stooge.nickname);

console.log(another_stooge.hasOwnProperty('age'));
console.log(stooge.hasOwnProperty('age' ));

// for in 会遍历原型中的属性
for (let attr in other_stooge) {
  console.log(attr, ':', other_stooge[attr]);
}


