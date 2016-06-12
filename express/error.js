/**
 * @author JerryC
 * @date  16/6/3
 * @description
 */
'use strict';

const app = require('express')();

app.use(function (req, res, next) {
  console.log('will throw error');
  next(new Error('this is a error'));
});

app.use(function (err, req, res, next) {
  console.log('a error occuer?');
  console.log(err);
  next();
});

app.listen(3000, function () {
  console.log('listening 3000 port');
});
