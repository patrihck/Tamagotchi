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
        lastname: 'User',
        firstname: 'Edited',
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
  const queryResult = await db.query('SELECT * FROM users WHERE id = 1');
  const userResult = queryResult.rows[0];

  expect(user.email).to.equal(userResult.email);
  expect(user.lastname).to.equal(userResult.lastname);
  expect(user.firstname).to.equal(userResult.firstname);
  expect(true).to.equal(
    await bcrypt.compare(user.password, userResult.password)
  );
}
