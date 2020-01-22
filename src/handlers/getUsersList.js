const db = require('../database/postgres/db-context');

module.exports = async (req, h) => {
  const queryResult = await db.query('SELECT * FROM users');
  return queryResult.rows;
};
