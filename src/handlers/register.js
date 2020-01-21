const bcrypt = require('bcryptjs');
const db = require('../database/postgres/db-context');

module.exports = async (req, h) => {
  const name = req.payload.name;
  const password = req.payload.password;

  const salt = await bcrypt.genSaltSync();
  const hashedPassword = await bcrypt.hash(password, salt);
  const query =
    'INSERT INTO users (firstname, password, lastname, email) values ($1, $2, $3, $4)';
  const values = [
    req.payload.firstname,
    hashedPassword,
    req.payload.lastname,
    req.payload.email
  ];
  const response = await db.query(query, values);
  return response;
};
