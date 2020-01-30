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
const endpoint = '/users/1';

describe('Edit user', () => {
  describe('/PATCH', () => {
    it('Existing user should be updated with new data', done => {
      const user = {
        email: 'editeduser@email.com',
        lastName: 'User',
        firstName: 'Edited',
        password: 'ihavejustbeenedited'
      };
      chaiMethods.makePatchRequest(
        url,
        endpoint,
        user,
        done,
        async (err, res) => {
          expect(res).to.have.status(200);
          await checkIfUserWasEdited(user);
        }
      );
    });
  });
});

async function checkIfUserWasEdited(user) {
  const userResult = (await db.findById(1))[0];

  expect(user.email).to.equal(userResult.email);
  expect(user.lastName).to.equal(userResult.lastname);
  expect(user.firstName).to.equal(userResult.firstname);
  expect(true).to.equal(
    await bcrypt.compare(user.password, userResult.password)
  );
}
