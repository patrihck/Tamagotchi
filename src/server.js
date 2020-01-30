require('dotenv').config();
const config = require('config');
const Hapi = require('@hapi/hapi');
const plugins = require('./plugins');
const routes = require('./routes');
const { Client } = require('pg');
const client = new Client(config.dbConfig);
const HapiAuthCookie = require('hapi-auth-cookie');
const authorization = require('./services/user/authorization');

const init = async () => {
  const server = new Hapi.Server({
    host: config.appConfig.host,
    port: config.appConfig.port
  });

  await server.register(plugins);

  await server.register(HapiAuthCookie);

  server.auth.strategy('restricted', 'cookie', {
    cookie: {
      name: 'restricted',
      password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
      isSecure: false
    },
    validateFunc: authorization.authorizeUser
  });

  server.route(routes);

  server.events.on('request', (event, tags) => {
    console.log(tags);
  });

  try {
    await server.start();
    await client.connect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
  }
};

exports.startServer = init;
exports.client = client;
