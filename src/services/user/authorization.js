const userRepo = require('../../database/repository/user-repository');

exports.authorizeUser = async (req, cookie) => {
  const user = await userRepo.findByEmail(cookie.email, req);
  return { valid: user !== undefined, credentials: user };
};
