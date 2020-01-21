const db = require('../../database/postgres/db-context');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async user => {
  try {
    const email = user.email;
    const queryResult = await db.query(
      "SELECT * FROM users WHERE email = '" + email + "'"
    );

    const existingUser = queryResult.rows[0];

    if (await bcrypt.compare(user.password, existingUser.password)) {
      console.log('Password is correct.');
      return true;
    } else {
      console.log('Password is incorrect !');
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
