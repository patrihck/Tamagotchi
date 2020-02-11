const db = require('../database/postgres/db-context');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  try {
    return await db.getPetActions(req);
  } catch (err) {
    req.log(['get', 'petActions', 'error'], err);
    return new Boom.badImplementation(err);
  }
};
