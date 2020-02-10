const config = require('config');
const init = require('../server.js');
const url = `http://${config.appConfig.host}:${config.appConfig.port}`;
const nanoid = require('nanoid');
const db = require('../database/postgres/db-context');

init.startServer();

exports.url = url;
exports.getRandomId = () => {
  return nanoid();
};

exports.getUnknownUserId = async () => {
  while (true) {
    const randomId = Math.floor(Math.random() * 100000);
    const userResult = await db.findById(randomId);
    if (!userResult.length) {
      return randomId;
    }
  }
};
