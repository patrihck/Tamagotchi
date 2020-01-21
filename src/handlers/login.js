require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require('../modules/user/authentication');

module.exports = async (req, h) => {
  const user = {
    email: req.payload.email,
    firstname: req.payload.firstname,
    lastname: req.payload.lastname,
    password: req.payload.password
  };

  const authenticationSuccess = await auth.authenticateUser(user);

  if (!authenticationSuccess) {
    h.response(500);
  }

  try {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    return accessToken;
  } catch (err) {
    console.log(err);
  }
};
