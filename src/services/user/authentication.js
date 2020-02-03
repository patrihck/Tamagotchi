const db = require('../../database/postgres/db-context');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async (email, password) => {
  const existingUser = (await db.findByEmail(email))[0];

  if (!existingUser) {
    return false;
  }

  const valid = await bcrypt.compare(password, existingUser.password);
  return valid;
};
