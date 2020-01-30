require('dotenv').config();
const auth = require('../modules/user/authentication');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  const user = {
    email: req.payload.email,
    firstname: req.payload.firstname,
    lastName: req.payload.lastName,
    password: req.payload.password
  };

  const authenticationSuccess = await auth.authenticateUser(user);
  if (!authenticationSuccess) {
    return new Boom.unauthorized('Unknown email or password');
  }

  const email = user.email;

  req.cookieAuth.set({ email });
  return h.response({ status: '200' }).code(200);
};
