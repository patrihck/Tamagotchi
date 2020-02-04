const init = require('../../server');
const userRepository = require('../repository/user-repository');
const petRepository = require('../repository/pet-repository');

async function query(queryString, params, req) {
  try {
    const response = await init.client.query(queryString, params);
    return response;
  } catch (err) {
    if (req !== undefined) {
      req.log(['database', 'query', 'error'], err);
    }
  }
}

exports.getAllUsers = async req => {
  return (await query(userRepository.getUsers, null, req)).rows;
};

exports.findByEmail = async (email, req) => {
  return (await query(userRepository.getUserByEmail, [email], req)).rows;
};

exports.findById = async (id, req) => {
  return (await query(userRepository.getUserByIdQuery, [id], req)).rows;
};

exports.addNewUser = async (values, req) => {
  await query(userRepository.addUserQuery, values, req);
};

exports.addNewPetModifier = async (values, req) => {
  await query(petRepository.addPetModifierQuery, values, req);
};

exports.editUser = async (values, req) => {
  await query(userRepository.editUserQuery, values, req);
};

exports.deleteUser = async (values, req) => {
  await query(userRepository.deleteUserQuery, values, req);
};
