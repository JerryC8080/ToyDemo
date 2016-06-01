/**
 * @author JerryC
 * @date  16/6/1
 * @description
 */
'use strict';
const phantom = require('phantom');
let sitePage = null;
let phInstance = null;

phantom.create([
  '--ignore-ssl-errors=yes',
  '--load-images=no',
  '--debug=true'
  //'--ssl-protocol=tlsv1',
  //'--web-security=false',
  //'--ignore-ssl-errors=true'
]).then((instance) => {
  phInstance = instance;
  return instance.createPage();
}).then((page) => {
  sitePage = page;
  let url = 'http://stores.ebay.com/VIP-COUTURE';
  //sitePage.settings.resourceTimeout = 2000;
  console.log('opening ' + url);
  return sitePage.open(url);
}).then((status) => {
  console.log('status:', status);
  return sitePage.property('content');
}).then((content) => {
  console.log('the content is:');
  console.log(content);
  sitePage.close();
  phInstance.exit();
}).catch((error) => {
  console.log(error);
  phInstance.exit();
});