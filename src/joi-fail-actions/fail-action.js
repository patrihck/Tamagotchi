const Boom = require('@hapi/boom');

module.exports = (req, h, err) => {
  console.log(err);
  return Boom.badRequest(err);
};
