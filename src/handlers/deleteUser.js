const userRepo = require('../database/repository/user-repository');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  const userId = req.params.id;

  try {
    const users = await userRepo.findById(userId);

    if (users.length > 0) {
      const deletedAt = new Date();
      await userRepo.deleteUser([deletedAt, userId]);
    } else {
      return new Boom.conflict('Unknown id');
    }
  } catch (err) {
    req.log(['delete', 'user', 'error'], err);
    return new Boom.badImplementation(err);
  }

  return h.response({ status: '200' }).code(200);
};
