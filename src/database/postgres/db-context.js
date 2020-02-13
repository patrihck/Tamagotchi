const init = require('../../server');
const userRepository = require('../repository/user-repository');
const petRepository = require('../repository/pet-repository');

async function query(queryString, params, req) {
  try {
    const response = await init.client.query(queryString, params);
    return response;
  } catch (err) {
    console.log(err);
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

exports.addPetType = async (petType, req) => {
  await query(petRepository.addPetTypeQuery, [petType.name], req);
};

exports.addPetProperty = async (petProperty, req) => {
  await query(
    petRepository.addPetPropertyQuery,
    [
      petProperty.petTypeId,
      petProperty.name,
      petProperty.value,
      petProperty.weight,
      petProperty.valuePerTime
    ],
    req
  );
};

exports.getPetModifierByName = async (name, req) => {
  return (await query(petRepository.getPetModifierByNameQuery, [name], req))
    .rows;
};

exports.getPetTypeByName = async (name, req) => {
  return (await query(petRepository.getPetTypeByNameQuery, [name], req)).rows;
};

exports.getPetActions = async req => {
  return (await query(petRepository.getPetActionsQuery, null, req)).rows;
};

exports.getPetActionByName = async (name, req) => {
  return (await query(petRepository.getPetActionByNameQuery, [name], req)).rows;
};

exports.addPetAction = async (values, req) => {
  await query(petRepository.addPetActionQuery, values, req);
};

exports.addPetModifierToPetAction = async (values, req) => {
  await query(petRepository.addPetModifierToPetActionQuery, values, req);
};

exports.addPet = async (values, req) => {
  await query(petRepository.addPetQuery, values, req);
};

exports.getPetByName = async (name, req) => {
  return (await query(petRepository.getPetByNameQuery, [name], req)).rows;
};
