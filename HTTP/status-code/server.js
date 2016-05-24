/**
 * @author JerryC
 * @date  16/5/24
 * @description
 */
'use strict';

const app = require('express')();
const codeStatus = [
  200, 204, 206,
  301, 302, 303, 304, 307,
  400, 401, 403, 404,
  500, 503
];

for (let code of codeStatus ){
  app.get('/' + code, (req, res) => {
    res.sendStatus(code);
  });
}

app.listen(3000, () => {
  console.log('Server running on port 3000!');
});