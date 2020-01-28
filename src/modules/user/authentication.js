const db = require('../../database/postgres/db-context');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async user => {
  try {
    const email = user.email;
    const queryResult = await db.findByEmail(email);
    const existingUsers = queryResult.rows;

    if (!existingUsers) {
      return false;
    }

    if (await bcrypt.compare(user.password, existingUser.password)) {
      console.log('Password is correct.');
      return true;
    } else {
      console.log('Password is incorrect !');
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
