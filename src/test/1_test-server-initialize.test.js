const config = require('config');
const init = require('../server.js');
const url = `http://${config.appConfig.host}:${config.appConfig.port}`;
const nanoid = require('nanoid');

init.startServer();

exports.url = url;
exports.getRandomId = () => {
  return nanoid();
};
