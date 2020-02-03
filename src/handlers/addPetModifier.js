const db = require('../database/postgres/db-context');
const PetModifier = require('../database/models/pet-modifier');

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
    return h.response().code(500);
  }
};
