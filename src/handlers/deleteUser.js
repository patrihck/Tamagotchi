const db = require('../database/postgres/db-context');

module.exports = async (req, h) => {
  const userId = req.params.id;

  try {
    await db.query(
      'UPDATE users SET isdeleted = true WHERE id = $1',
      [userId],
      req
    );
  } catch (err) {
    req.log(['delete', 'user', 'error'], err);
  }

  return h.response({ status: '200' }).code(200);
};
