const db = require('../database/postgres/db-context');

module.exports = async (req, h) => {
  const userId = req.params.id;

  try {
    await db.query('UPDATE users SET isdeleted = true WHERE id = $1', [userId]);
  } catch (err) {
    console.log(err);
  }

  return h.response({ status: '200' }).code(200);
};
