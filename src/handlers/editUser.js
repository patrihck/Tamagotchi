const db = require('../database/postgres/db-context');
const bcrypt = require('bcryptjs');

module.exports = async (req, h) => {
  try {
    const userId = req.params['id'].replace(':', '');

    const user = {
      firstname: req.payload.firstname,
      lastname: req.payload.lastname,
      email: req.payload.email,
      password: req.payload.password
    };

    const salt = await bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const queryString =
      'UPDATE users SET firstname = $1, lastname = $2, email = $3, password = $4 WHERE id = $5';

    const values = [
      user.firstname,
      user.lastname,
      user.email,
      hashedPassword,
      userId
    ];

    await db.query(queryString, values);

    return 'SUCCESS';
  } catch (err) {
    console.log(err);
  }
};
