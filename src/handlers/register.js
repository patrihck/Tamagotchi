const bcrypt = require('bcryptjs');
const db = require('../database/postgres/db-context');

module.exports = async (req, h) => {
  const name = req.payload.name;
  const password = req.payload.password;

  const salt = await bcrypt.genSaltSync();
  const hashedPassword = await bcrypt.hash(password, salt);
  const query =
    "INSERT INTO users (firstname, password, lastname, email) values ('" +
    name +
    "', '" +
    hashedPassword +
    "', '" +
    req.payload.lastname +
    "', '" +
    req.payload.email +
    "')";

  const response = await db.query(query);
  return response;
};
