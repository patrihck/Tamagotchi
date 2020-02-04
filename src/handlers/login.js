require('dotenv').config();
const auth = require('../services/user/authentication');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  const { email, password } = req.payload;
  const authenticationSuccess = await auth.authenticateUser(
    email,
    password,
    req
  );

  if (!authenticationSuccess) {
    return new Boom.unauthorized('Unknown email or password');
  }

  req.cookieAuth.set({ email });
  return h.response().code(200);
};
