const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const chaiMethods = require('./chai-helper-methods');
chai.use(chaiHttp);
chai.use(require('chai-json'));
const testServer = require('./1_test-server-initialize.test');
const bcrypt = require('bcryptjs');
const db = require('../database/postgres/db-context');

const user = {
  firstName: 'Jack',
  lastName: 'Brown',
  email: 'jackbrown@gmail.com',
  password: '1348ff34354gfrf'
};

describe('Get users', () => {
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
  it('Logged in user should be able to get list of users', done => {
    chaiMethods.makePostRequest(
      testServer.url,
      '/login',
      user,
      null,
      (err, res) => {
        const cookie = res.header['set-cookie'][0].split(';')[0];
        chaiMethods.makeGetRequest(
          testServer.url,
          '/users',
          'Cookie',
          cookie,
          done,
          (err, res) => {
            expect(res).to.have.status(200);
          }
        );
      }
    );
  });

  it('should result with unauthorized error', done => {
    chaiMethods.makeGetRequest(
      testServer.url,
      '/users',
      'Cookie',
      '',
      done,
      (err, res) => {
        expect(res).to.have.status(401);
      }
    );
  });
});
