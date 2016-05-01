'use strict';
const Promise = require("bluebird");
const Datastore = require("nedb");

const db = new Datastore();
const dbAsy = Promise.promisifyAll(db);

let data = {
  name: 'jc',
  peopoles: [
    {name: 'jc', age: 12, hobits: ['ab', 'cc']},
    {name: 'jcccc', age: 122},
    {name: 'jerryc', age: 1112}    
  ]
}

db.insert(data, function (err, data) {
  console.log(data);
  db.update({name: data.name}, {
    $push: {
      'peopoles.0.hobits': 'bb'
    }
  }, {returnUpdatedDocs: true}, (err, num, data) => {
    console.log(data);
    db.findOne({}, (err, data) => {
      console.log(data);
      console.log(data.peopoles[0].hobits)
    });
  });
});