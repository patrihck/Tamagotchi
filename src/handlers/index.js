const login = require('./login');
const register = require('./register');
const home = require('./home');
const getUsers = require('./getUsersList');
const editUser = require('./editUser');

module.exports = {
  login,
  register,
  home,
  getUsers,
  editUser
};
