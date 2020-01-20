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

  console.log('User authentication is: ');
  console.log(auth.authenticateUser(user));

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
};
