const db = require('../database/postgres/db-context');
const bcrypt = require('bcryptjs');

module.exports = async (req, h) => {
  try {
    const userId = req.params.id;

    const existingUsers = await db.findById(userId);

    if (existingUsers.length === 0) {
      return h.response({ error: 'unknown userId' }).code(500);
    }

    const user = {
      firstName: req.payload.firstName,
      lastName: req.payload.lastName,
      email: req.payload.email,
      password: req.payload.password
    };

    const salt = await bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const queryString =
      'UPDATE users SET firstName = $1, lastName = $2, email = $3, password = $4 WHERE id = $5';

    const values = [
      user.firstName,
      user.lastName,
      user.email,
      hashedPassword,
      userId
    ];

    await db.query(queryString, values);

    return h.response({ status: '200' }).code(200);
  } catch (err) {
    return h.response().code(500);
  }
};
