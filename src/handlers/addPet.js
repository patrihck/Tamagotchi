const Pet = require('../database/models/pet');
const db = require('../database/postgres/db-context');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  const pet = new Pet(null, req.payload.name, req.payload.petTypeId);

  try {
    const userEmail = req.state.restricted.email;
    const userId = (await db.findByEmail(userEmail, req))[0].id;
    await db.addPet([userId, pet.petTypeId, pet.name], req);

    return h.response().code(200);
  } catch (err) {
    req.log(['add', 'pet action', 'error'], err);
    return new Boom.badData(err);
  }
};
