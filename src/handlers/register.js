const bcrypt = require('bcryptjs');
const db = require('../database/postgres/db-connection');

module.exports = async (req, h) => {
  const name = req.payload.name;
  const password = req.payload.password;

  const salt = await bcrypt.genSaltSync();
  const hashedPassword = await bcrypt.hash(password, salt);
  const query =
    "INSERT INTO users (firstname, password) values ('" +
    name +
    "', '" +
    hashedPassword +
    "')";

  console.log(hashedPassword);
  console.log(query);

  return await db.query(query);
};
