const db = require('../database/postgres/db-context');

module.exports = async (req, h) => {
  const userId = req.params.id;

  await db.query('DELETE FROM users WHERE id = $1', [userId]);

  return 'SUCCESSFULLY DELETED';
};
