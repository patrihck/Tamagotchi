const login = require('./login');
const register = require('./register');
const home = require('./home');
const getUsers = require('./getUsersList');
const editUser = require('./editUser');
const deleteUser = require('./deleteUser');
const addPetModifier = require('./addPetModifier');
const addPetType = require('./addPetType');

module.exports = {
  login,
  register,
  home,
  getUsers,
  editUser,
  deleteUser,
  addPetModifier,
  addPetType
};
