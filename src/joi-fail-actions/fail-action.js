const Boom = require('@hapi/boom');

module.exports = (req, h, err) => {
  return Boom.badRequest(err);
};
