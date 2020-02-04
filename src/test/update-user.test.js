const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('config');
const chaiMethods = require('./chai-helper-methods');
chai.use(chaiHttp);
chai.use(require('chai-json'));
const db = require('../database/postgres/db-context');
const bcrypt = require('bcryptjs');

const url = `http://${config.appConfig.host}:${config.appConfig.port}`;
let userId = undefined;

describe('Edit user', () => {
  describe('/PATCH', () => {
    it('Existing user should be updated with new data', done => {
      chaiMethods.makePostRequest(
        url,
        '/register',
        {
          email: 'gerardsmith@email.com',
          lastName: 'Smith',
          firstName: 'Gerard',
          password: 'ihavenotbeenedited'
        },
        null,
        async (err, res) => {
          userId = (await db.findByEmail('gerardsmith@email.com'))[0].id;

          const editedUser = {
            email: 'gerardstone@email.com',
            lastName: 'Stone',
            firstName: 'Gerard',
            password: 'ihavejustbeenedited'
          };

          chaiMethods.makePatchRequest(
            url,
            `/users/${userId}`,
            editedUser,
            done,
            async (err, res) => {
              expect(res).to.have.status(200);
              await checkIfUserWasEdited(editedUser);
            }
          );
        }
      );
    });

    it('Patch request should fail because of wrong id', done => {
      getUnknownUserId().then(unknownUserId => {
        const user = {
          email: 'unknownemail@email.com',
          lastName: 'User',
          firstName: 'Edited',
          password: 'ihavejustbeenedited'
        };
        chaiMethods.makePatchRequest(
          url,
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

async function getUnknownUserId() {
  while (true) {
    const randomId = Math.floor(Math.random() * 100000);
    const userResult = await db.findById(randomId);
    if (!userResult.length) {
      return randomId;
    }
  }
}
