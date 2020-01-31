const db = require('../../database/postgres/db-context');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async (email, password) => {
  try {
    const existingUser = (await db.findByEmail(email))[0];

    if (!existingUser) {
      return false;
    }

    if (await bcrypt.compare(password, existingUser.password)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
