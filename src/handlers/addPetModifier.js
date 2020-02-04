const PetModifier = require('../database/models/pet-modifier');
const db = require('../database/postgres/db-context');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  const petModifier = new PetModifier(
    null,
    req.payload.name,
    req.payload.property,
    req.payload.modifier
  );

  try {
    await db.addNewPetModifier([
      petModifier.name,
      petModifier.property,
      petModifier.modifier
    ]);
    return h.response().code(200);
  } catch (err) {
    return Boom.conflict();
  }
};
