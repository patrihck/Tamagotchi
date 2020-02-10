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
  email: `${testServer.getRandomId()}simpleuser@email.com`,
  firstName: 'Simple',
  lastName: 'User',
  password: '434256t3ewf'
};

let userId;
let unknownUserId;

describe('Delete User', () => {
  before(async () => {
    await db.addNewUser([
      user.firstName,
      user.password,
      user.lastName,
      user.email
    ]);

    userId = (await db.findByEmail(user.email))[0].id;
    unknownUserId = await testServer.getUnknownUserId();
  });

  it('Existing user should be deleted from db', done => {
    chaiMethods.makeDeleteRequest(
      testServer.url,
      `/users/${userId}`,
      done,
      async (err, res) => {
        expect(res).to.have.status(200);
        await checkIfUserWasDeleted(userId);
      }
    );
  });

  it('should fail because of unknown id', done => {
    chaiMethods.makeDeleteRequest(
      testServer.url,
      `/users/${unknownUserId}`,
      done,
      (err, res) => {
        expect(res).to.have.status(409);
      }
    );
  });

  it('should fail because of id equal to 0', done => {
    chaiMethods.makeDeleteRequest(
      testServer.url,
      `/users/0`,
      done,
      (err, res) => {
        expect(res).to.have.status(400);
      }
    );
  });

  it('should fail because of non numeric id', done => {
    chaiMethods.makeDeleteRequest(
      testServer.url,
      `/users/A`,
      done,
      (err, res) => {
        expect(res).to.have.status(400);
      }
    );
  });
});

async function checkIfUserWasDeleted(userId) {
  const usersResult = await db.findById(userId);
  expect(usersResult[0].isdeleted).to.eql(true);
}
