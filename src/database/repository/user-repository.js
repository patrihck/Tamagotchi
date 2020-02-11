exports.addUserQuery =
  'INSERT INTO users (firstName, password, lastName, email) values ($1, $2, $3, $4)';

exports.getUserByIdQuery =
  'SELECT * FROM users WHERE id = $1 AND deletedAt is NULL';
exports.getUserByEmail =
  'SELECT * FROM users WHERE email = $1 AND deletedAt is NULL';

exports.getUsers = 'SELECT * FROM users WHERE deletedAt is NULL';

exports.editUserQuery =
  'UPDATE users SET firstName = $1, lastName = $2, email = $3, password = $4 WHERE id = $5';

exports.deleteUserQuery = 'UPDATE users SET deletedat = $1 WHERE id = $2';
