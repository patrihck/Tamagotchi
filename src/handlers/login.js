const db = require('../database/postgres/db-connection');

module.exports = (req, h) => {
  const name = req.payload.name;
  const password = req.payload.password;
  console.log(name, password);
  db.query('SELECT email FROM users');
  return 'Login site XD';
};
