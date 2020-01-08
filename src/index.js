const config = require('config');

const Hapi = require('@hapi/hapi');

const plugins = require('./plugins');
const routes = require('./routes');

const { Client } = require('pg');
const client = new Client(config.dbConfig);

module.exports = async () => {
  const server = new Hapi.Server({
    host: config.appConfig.host,
    port: config.appConfig.port
  });

  await server.register(plugins);

  server.route(routes);

  try {
    await server.start();
    await client.connect();

    client.query('SELECT * FROM users', (err, res) => {
      if (err) throw err;
      console.log(res.rows);
      client.end();
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
