const userRepo = require('../database/repository/user-repository');
const bcrypt = require('bcryptjs');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  try {
    const userId = req.params.id;

    const existingUser = await userRepo.findById(userId);

    if (existingUser === undefined) {
      return Boom.conflict('unknown user');
    }

    const user = {
      firstName: req.payload.firstName,
      lastName: req.payload.lastName,
      email: req.payload.email,
      password: req.payload.password
    };

    const salt = await bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const values = [
      user.firstName,
      user.lastName,
      user.email,
      hashedPassword,
      userId
    ];

    await userRepo.editUser(values);

    return h.response({ status: '200' }).code(200);
  } catch (err) {
    req.log(['update user', 'error'], err);
    return new Boom.badImplementation(err);
  }
};
