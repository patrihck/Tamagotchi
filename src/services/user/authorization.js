const db = require('../../database/postgres/db-context');

exports.authorizeUser = async (req, cookie) => {
  const user = await db.findByEmail(cookie.email);
  return { valid: user.length > 0, credentials: user[0] };
};
