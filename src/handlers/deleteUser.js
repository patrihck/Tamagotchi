const db = require('../database/postgres/db-context');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  const userId = req.params.id;

  try {
    const deletedAt = new Date();
    await db.deleteUser([deletedAt, userId]);
  } catch (err) {
    req.log(['delete', 'user', 'error'], err);
    return new Boom.badImplementation(err);
  }

  return h.response({ status: '200' }).code(200);
};
