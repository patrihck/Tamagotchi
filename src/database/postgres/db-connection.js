const { Client } = require('pg');

const client = new Client({
  host: 'postgres',
  user: 'postgres',
  password: 'password',
  database: 'tamagotchi'
});

exports.query = async queryString => {
  try {
    await client.connect();
    const response = await client.query(queryString);
    await client.end();
    return response;
  } catch (err) {
    console.log(err);
  }
};
