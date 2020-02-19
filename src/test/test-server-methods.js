const config = require('config');
const init = require('../server.js');
const url = `http://${config.appConfig.host}:${config.appConfig.port}`;
const nanoid = require('nanoid');
const userRepo = require('../database/repository/user-repository');
const chai = require('chai');
const bcrypt = require('bcryptjs');

init.startServer();

exports.url = url;
exports.getRandomId = () => {
  return nanoid();
};

exports.init = init;

exports.getUnknownUserId = async () => {
  while (true) {
    const randomId = Math.floor(Math.random() * 100000);
    const userResult = await userRepo.findById(randomId);
    if (!userResult.length) {
      return randomId;
    }
  }
};

exports.registerUser = async user => {
  const salt = await bcrypt.genSaltSync();
  const hashedPassword = await bcrypt.hash(user.password, salt);
  await userRepo.addNewUser([
    user.firstName,
    hashedPassword,
    user.lastName,
    user.email
  ]);
};

exports.logInAndGetCookie = async user => {
  const res = await chai
    .request(url)
    .post('/login')
    .send(user);
  return res.header['set-cookie'][0].split(';')[0];
};
