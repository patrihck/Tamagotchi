const userRepo = require('../database/repository/user-repository');

module.exports = async (req, h) => {
  const result = await userRepo.getAllUsers(req);
  return result;
};
