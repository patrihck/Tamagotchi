const petRepo = require('../database/repository/pet-repository');

module.exports = async (req, h) => {
  const petTypes = await petRepo.getPetTypes(req);
  return petTypes;
};
