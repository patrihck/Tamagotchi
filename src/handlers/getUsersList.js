const db = require('../database/postgres/db-context');

module.exports = async (req, h) => {
  const result = await db.getAllUsers(req);
  return result;
};
