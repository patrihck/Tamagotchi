const db = require('../../database/postgres/db-context');

exports.authorizeUser = async (req, cookie) => {
  const queryResult = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [cookie.email],
    req
  );
  const user = queryResult.rows;
  return { valid: user.length, credentials: user[0] };
};
