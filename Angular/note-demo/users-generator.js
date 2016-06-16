'use strict';
const chancejs = require("chance")();
const fs = require("fs");
const jsonPath = 'data/users.json';
const num = 20;

let users = [];

for (var index = 0; index < num; index++) {
  let user = {
    name: chancejs.name(),
    age: chancejs.age(),
    avatar: chancejs.avatar(),
    id: chancejs.guid(),
    desc: chancejs.paragraph(),
	  checkmark: chancejs.bool() 
  };
  users.push(user);

  let userPath = `data/${user.id}.json`;
  fs.writeFileSync(userPath, JSON.stringify(user));
}

fs.writeFile(jsonPath, JSON.stringify(users), (err) => {
  err && console.log(err);
});
