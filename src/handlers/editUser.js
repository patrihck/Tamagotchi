const db = require('../database/postgres/db-context');
const bcrypt = require('bcryptjs');
const Boom = require('@hapi/boom');

module.exports = async (req, h) => {
  try {
    const userId = req.params.id;

    const existingUsers = await db.findById(userId);

    if (!existingUsers.length) {
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

    await db.editUser(values);

    return h.response({ status: '200' }).code(200);
  } catch (err) {
    req.log(['update user', 'error'], err);
    return new Boom.badImplementation(err);
  }
};
