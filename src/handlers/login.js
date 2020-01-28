require('dotenv').config();
const auth = require('../modules/user/authentication');
const { Boom } = require('@hapi/boom');

module.exports = async (req, h) => {
  const user = {
    email: req.payload.email,
    firstname: req.payload.firstname,
    lastname: req.payload.lastname,
    password: req.payload.password
  };

  const authenticationSuccess = await auth.authenticateUser(user);
  console.log('Authentication : ', authenticationSuccess);
  if (!authenticationSuccess) {
    return new Boom('Unknown user', { statusCode: 501 });
  }

  const email = user.email;

  req.cookieAuth.set({ email });
  return h.response({ status: '200' }).code(200);
};
