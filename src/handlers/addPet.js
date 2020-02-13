const Pet = require('../database/models/pet');
const db = require('../database/postgres/db-context');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  const pet = new Pet(null, req.payload.name, req.payload.petTypeId);

  try {
    await db.addPet([pet.name, pet.petTypeId], req);
    console.log(req.cookie, req.cookie.email);
    return h.response().code(200);
  } catch (err) {
    req.log(['add', 'pet action', 'error'], err);
    return new Boom.badData(err);
  }
};
