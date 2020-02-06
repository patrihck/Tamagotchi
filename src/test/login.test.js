const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const chaiMethods = require('./chai-helper-methods');
const testServer = require('./1_test-server-initialize.test');
const db = require('../database/postgres/db-context');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);
chai.use(require('chai-json'));

const user = {
  email: 'user@email.com',
  lastName: 'lastname',
  firstName: 'firstname',
  password: 'thepassword'
};

describe('User login', () => {
  before(async () => {
    const salt = await bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.email = testServer.getRandomId() + user.email;
    await db.addNewUser([
      user.firstName,
      hashedPassword,
      user.lastName,
      user.email
    ]);
  });
  it('registered user should be able to login', done => {
    chaiMethods.makePostRequest(
      testServer.url,
      '/login',
      user,
      done,
      (err, res) => {
        expect(res).to.have.status(200);
      }
    );
  });

  it('unknown user should not be able to log in', done => {
    const unknownUserId = testServer.getRandomId();
    chaiMethods.makePostRequest(
      testServer.url,
      '/login',
      {
        email: `${unknownUserId}unknownuser@emailemail.com`,
        lastName: 'Jan',
        firstName: 'Nowak',
        password: '@@@###%^&kj3d'
      },
      done,
      (err, res) => {
        expect(res).to.have.status(401);
      }
    );
  });
});
