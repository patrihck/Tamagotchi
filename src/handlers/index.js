const login = require('./login');
const register = require('./register');
const home = require('./home');
const getUsers = require('./getUsersList');
const editUser = require('./editUser');
const deleteUser = require('./deleteUser');
const addPetModifier = require('./addPetModifier');
const addPetType = require('./addPetType');
const getPetActions = require('./getPetActions');
const addPetAction = require('./addPetAction');
const addPet = require('./addPet');

module.exports = {
  login,
  register,
  home,
  getUsers,
  editUser,
  deleteUser,
  addPetModifier,
  addPetType,
  getPetActions,
  addPetAction,
  addPet
};
