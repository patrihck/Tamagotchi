const db = require('../database/postgres/db-context');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  const userId = req.params.id;

  try {
    const users = await db.findById(userId);

    if (users.length > 0) {
      const deletedAt = new Date();
      await db.deleteUser([deletedAt, userId]);
    } else {
      return new Boom.conflict('Unknown id');
    }
  } catch (err) {
    req.log(['delete', 'user', 'error'], err);
    return new Boom.badImplementation(err);
  }

  return h.response({ status: '200' }).code(200);
};
