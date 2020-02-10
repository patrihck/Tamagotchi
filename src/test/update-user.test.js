const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const chaiMethods = require('./chai-helper-methods');
chai.use(chaiHttp);
chai.use(require('chai-json'));
const testServer = require('./1_test-server-initialize.test');
const bcrypt = require('bcryptjs');
const db = require('../database/postgres/db-context');

let userId;
const user = {
  email: `${testServer.getRandomId()}gerardsmith@email.com`,
  lastName: 'Smith',
  firstName: 'Gerard',
  password: 'ihavenotbeenedited'
};

describe('Edit user', () => {
  before(async () => {
    user.email = testServer.getRandomId() + user.email;

    await db.addNewUser([
      user.firstName,
      user.password,
      user.lastName,
      user.email
    ]);

    userId = (await db.findByEmail(user.email))[0].id;
  });

  const editedUser = {
    email: `${testServer.getRandomId()}editeduser@gmail.com`,
    lastName: 'Fox',
    firstName: 'Tom',
    password: 'fwvnerowbvnoew'
  };

  it('Existing user should be updated with new data', done => {
    chaiMethods.makePatchRequest(
      testServer.url,
      `/users/${userId}`,
      editedUser,
      done,
      async (err, res) => {
        expect(res).to.have.status(200);
        await checkIfUserWasEdited(editedUser);
      }
    );
  });

  it('Patch request should fail because of wrong id', done => {
    testServer.getUnknownUserId().then(unknownUserId => {
      const user = {
        email: 'unknownemail@email.com',
        lastName: 'User',
        firstName: 'Edited',
        password: 'ihavejustbeenedited'
      };
      chaiMethods.makePatchRequest(
        testServer.url,
        `/users/${unknownUserId}`,
        user,
        done,
        (err, res) => {
          expect(res).to.have.status(409);
        }
      );
    });
  });
});

async function checkIfUserWasEdited(user) {
  const userResult = (await db.findById(userId))[0];

  expect(user.email).to.equal(userResult.email);
  expect(user.lastName).to.equal(userResult.lastname);
  expect(user.firstName).to.equal(userResult.firstname);
  expect(true).to.equal(
    await bcrypt.compare(user.password, userResult.password)
  );
}
