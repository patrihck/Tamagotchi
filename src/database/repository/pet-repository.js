exports.addPetModifierQuery =
  'INSERT INTO petModifiers (name, property, modifier) values ($1, $2, $3)';

exports.addPetTypeQuery = 'INSERT INTO petTypes (name) values ($1)';

exports.addPetPropertyQuery =
  'INSERT INTO petProperties (petTypeId, name, value, weight, valuePerTime) values ($1, $2, $3, $4, $5)';

exports.getPetModifierByNameQuery =
  'SELECT * FROM petModifiers WHERE name = $1';

exports.getPetTypeByNameQuery = 'SELECT * FROM petTypes WHERE name = $1';
