const petRepo = require('../database/repository/pet-repository');

module.exports = async (req, h) => {
  return await petRepo.getPetTypes(req);
};
