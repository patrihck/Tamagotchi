const db = require('../database/postgres/db-context');

module.exports = async (req, h) => {
  return await db.getAllUsers(req);
};
