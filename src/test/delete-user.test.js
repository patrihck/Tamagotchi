const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('config');
const chaiMethods = require('./chai-helper-methods');
chai.use(chaiHttp);
chai.use(require('chai-json'));
const db = require('../database/postgres/db-context');

const url = `http://${config.appConfig.host}:${config.appConfig.port}`;

describe('Delete user', () => {
  describe('/DELETE', () => {
    it('Existing user should be deleted from db', done => {
      chaiMethods.makePostRequest(
        url,
        '/register',
        {
          firstName: 'Jan',
          lastName: 'Rodzeń',
          email: 'janrodzen@gmail.com',
          password: 'kalafior18@1213'
        },
        null,
        async (err, res) => {
          const userId = (await db.findByEmail('janrodzen@gmail.com'))[0].id;
          chaiMethods.makeDeleteRequest(
            url,
            `/users/${userId}`,
            done,
            (err, res) => {
              expect(res).to.have.status(200);
              checkIfUserWasDeleted();
            }
          );
        }
      );
    });
  });
});

async function checkIfUserWasDeleted() {
  const usersResult = await db.findById(1);
  expect(usersResult[0].isdeleted).to.eql(true);
}
