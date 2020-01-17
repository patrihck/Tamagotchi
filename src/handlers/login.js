const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = (req, h) => {
  const user = {
    email: req.payload.email,
    firstname: req.payload.firstname,
    lastname = req.payload.lastname,
    password = req.payload.password
  }

  const accessToken = jwt.sign(user, process.env.)

}

