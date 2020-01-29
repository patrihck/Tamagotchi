const db = require('../../database/postgres/db-context');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async user => {
  try {
    const email = user.email;
    const existingUser = (await db.findByEmail(email))[0];

    if (!existingUser) {
      return false;
    }

    if (await bcrypt.compare(user.password, existingUser.password)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
