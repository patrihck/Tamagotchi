const init = require('../../server');
const userRepository = require('../repository/user-repository');
const petRepository = require('../repository/pet-repository');

exports.query = async (queryString, params, req) => {
  try {
    const response = await init.client.query(queryString, params);
    return response;
  } catch (err) {
    req.log(['database', 'query', 'error'], err);
  }
};

exports.findByEmail = async email => {
  return (await init.client.query(userRepository.getUserByEmail, [email])).rows;
};

exports.findById = async id => {
  return (await init.client.query(userRepository.getUserByIdQuery, [id])).rows;
};

exports.addNewUser = async values => {
  await init.client.query(userRepository.addUserQuery, values);
};

exports.addNewPetModifier = async values => {
  await init.client.query(petRepository.addPetModifierQuery, values);
};
