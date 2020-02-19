const petRepo = require('../database/repository/pet-repository');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  try {
    return await petRepo.getPetActions(req);
  } catch (err) {
    req.log(['get', 'petActions', 'error'], err);
    return new Boom.badImplementation(err);
  }
};
