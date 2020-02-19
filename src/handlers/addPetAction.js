const PetAction = require('../database/models/pet-action');
const petRepo = require('../database/repository/pet-repository');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  const petAction = new PetAction(
    null,
    req.payload.name,
    req.payload.petTypeId,
    req.payload.petModifierIds
  );

  try {
    await petRepo.addPetAction([petAction.name, petAction.petTypeId], req);

    const id = (await petRepo.getPetActionByName(petAction.name)).id;

    petAction.petModifierIds.forEach(async petModifierId => {
      await petRepo.addPetModifierToPetAction([petModifierId, id], req);
    });

    return h.response().code(200);
  } catch (err) {
    req.log(['add', 'pet action', 'error'], err);
    return new Boom.badData(err);
  }
};
