const bcrypt = require('bcryptjs');
const db = require('../database/postgres/db-context');

module.exports = async (req, h) => {
  const existingUsers = await db.findByEmail(req.payload.email);

  if (existingUsers.length > 0) {
    return h
      .response({ error: 'User with this email already exists' })
      .code(501);
  } else {
    const password = req.payload.password;
    const salt = await bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hash(password, salt);

    const query =
      'INSERT INTO users (firstname, password, lastName, email) values ($1, $2, $3, $4)';
    const values = [
      req.payload.firstname,
      hashedPassword,
      req.payload.lastName,
      req.payload.email
    ];

    const response = await db.query(query, values);
    return h.response(response).code(200);
  }
};
