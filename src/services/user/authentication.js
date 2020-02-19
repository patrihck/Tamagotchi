const userRepo = require('../../database/repository/user-repository');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async (email, password, req) => {
  const existingUser = (await userRepo.findByEmail(email, req))[0];

  if (!existingUser) {
    return false;
  }

  const valid = await bcrypt.compare(password, existingUser.password);
  return valid;
};
