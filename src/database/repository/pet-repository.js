const db = require('../postgres/db-context');

const addPetModifierQuery =
  'INSERT INTO petModifiers (name, property, modifier) values ($1, $2, $3)';

const addPetTypeQuery = 'INSERT INTO petTypes (name) values ($1)';

const addPetPropertyQuery =
  'INSERT INTO petProperties (petTypeId, name, value, weight, valuePerTime) values ($1, $2, $3, $4, $5)';

const getPetModifierByNameQuery = 'SELECT * FROM petModifiers WHERE name = $1';

const getPetTypeByNameQuery = 'SELECT * FROM petTypes WHERE name = $1';

const getPetActionsQuery = 'SELECT * FROM petActions';

const addPetActionQuery =
  'INSERT INTO petActions (name, petTypeId) values ($1, $2)';

const addPetModifierToPetActionQuery =
  'UPDATE petModifiers set petActionId = $2 WHERE id = $1';

const getPetActionByNameQuery = 'SELECT * FROM petActions WHERE name = $1';

const addPetQuery =
  'INSERT INTO pets (userId, petTypeId, name) values($1, $2, $3)';

const getPetByNameQuery = 'SELECT * FROM pets WHERE name = $1';

exports.addPetType = async (petType, req) => {
  await db.query(addPetTypeQuery, [petType.name], req);
};

exports.addPetProperty = async (petProperty, req) => {
  await db.query(
    addPetPropertyQuery,
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
  return (await db.query(getPetModifierByNameQuery, [name], req)).rows[0];
};

exports.getPetTypeByName = async (name, req) => {
  return (await db.query(getPetTypeByNameQuery, [name], req)).rows[0];
};

exports.getPetActions = async req => {
  return (await db.query(getPetActionsQuery, null, req)).rows;
};

exports.getPetActionByName = async (name, req) => {
  return (await db.query(getPetActionByNameQuery, [name], req)).rows;
};

exports.addPetAction = async (values, req) => {
  await db.query(addPetActionQuery, values, req);
};

exports.addNewPetModifier = async (values, req) => {
  await db.query(addPetModifierQuery, values, req);
};

exports.addPetModifierToPetAction = async (values, req) => {
  await db.query(addPetModifierToPetActionQuery, values, req);
};

exports.addPet = async (values, req) => {
  await db.query(addPetQuery, values, req);
};

exports.getPetByName = async (name, req) => {
  return (await db.query(getPetByNameQuery, [name], req)).rows;
};
