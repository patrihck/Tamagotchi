const config = require('config');
const init = require('../server.js');
const url = `http://${config.appConfig.host}:${config.appConfig.port}`;

exports.url = url;
init.startServer();
