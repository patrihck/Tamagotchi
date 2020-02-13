const PetAction = require('../database/models/pet-action');
const db = require('../database/postgres/db-context');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  const petAction = new PetAction(
    null,
    req.payload.name,
    req.payload.petTypeId,
    req.payload.petModifierIds
  );

  try {
    await db.addPetAction([petAction.name, petAction.petTypeId], req);

    const id = (await db.getPetActionByName(petAction.name))[0].id;

    petAction.petModifierIds.forEach(async petModifierId => {
      await db.addPetModifierToPetAction([petModifierId, id], req);
    });

    return h.response().code(200);
  } catch (err) {
    req.log(['add', 'pet action', 'error'], err);
    return new Boom.badData(err);
  }
};
