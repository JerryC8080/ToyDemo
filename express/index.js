/**
 * @author JerryC
 * @date  16/5/29
 * @description
 */
'use strict';

const express = require('express');
const app = express();

function foo() {
  console.log(this);
  console.log(Object.keys(this.req));
  console.log(Object.keys(this.res));
}

app.use((req, res, next) => {
  let result = res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
});

app.listen(3000, () => {
  console.log('listening 3000');
});