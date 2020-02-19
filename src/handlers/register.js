const bcrypt = require('bcryptjs');
const userRepo = require('../database/repository/user-repository');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  const existingUsers = await userRepo.findByEmail(req.payload.email, req);

  if (existingUsers.length > 0) {
    req.log(
      ['user', 'already', 'exists', 'error'],
      'User with this email already exists'
    );
    return new Boom.conflict('User already exists');
  }
  const password = req.payload.password;
  const salt = await bcrypt.genSaltSync();
  const hashedPassword = await bcrypt.hash(password, salt);

  const values = [
    req.payload.firstName,
    hashedPassword,
    req.payload.lastName,
    req.payload.email
  ];

  await userRepo.addNewUser(values);
  return h.response().code(200);
};
