exports.addUserQuery =
  'INSERT INTO users (firstName, password, lastName, email) values ($1, $2, $3, $4)';

exports.getUserByIdQuery = 'SELECT * FROM users WHERE id = $1';

exports.getUserByEmail = 'SELECT * FROM users WHERE email = $1';
