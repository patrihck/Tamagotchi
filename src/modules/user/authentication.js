const db = require('../../database/postgres');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async user => {
  const email = user.email;
  const existingUser = db.query(
    "SELECT * FROM users WHERE email = '" + email + "'"
  );

  if (await bcrypt.compare(user.password, existingUser.password)) {
    return true;
  } else return false;
};
