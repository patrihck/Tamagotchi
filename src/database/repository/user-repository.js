const db = require('../postgres/db-context');

const addUserQuery =
  'INSERT INTO users (firstName, password, lastName, email) values ($1, $2, $3, $4)';

const getUserByIdQuery =
  'SELECT * FROM users WHERE id = $1 AND deletedAt is NULL';
const getUserByEmail =
  'SELECT * FROM users WHERE email = $1 AND deletedAt is NULL';

const getUsers = 'SELECT * FROM users WHERE deletedAt is NULL';

const editUserQuery =
  'UPDATE users SET firstName = $1, lastName = $2, email = $3, password = $4 WHERE id = $5';

const deleteUserQuery = 'UPDATE users SET deletedat = $1 WHERE id = $2';

exports.getAllUsers = async req => {
  return (await db.query(getUsers, null, req)).rows;
};

exports.findByEmail = async (email, req) => {
  return (await db.query(getUserByEmail, [email], req)).rows[0];
};

exports.findById = async (id, req) => {
  return (await db.query(getUserByIdQuery, [id], req)).rows[0];
};

exports.addNewUser = async (values, req) => {
  await db.query(addUserQuery, values, req);
};

exports.editUser = async (values, req) => {
  await db.query(editUserQuery, values, req);
};

exports.deleteUser = async (values, req) => {
  await db.query(deleteUserQuery, values, req);
};
