const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('config');
const chaiMethods = require('./chai-helper-methods');
chai.use(chaiHttp);
chai.use(require('chai-json'));
const db = require('../database/postgres/db-context');

const url = `http://${config.appConfig.host}:${config.appConfig.port}`;
const endpoint = '/users/1';

describe('Delete user', () => {
  describe('/DELETE', () => {
    it('Existing user should be deleted from db', done => {
      chaiMethods.makeDeleteRequest(url, endpoint, done, (err, res) => {
        expect(res).to.have.status(200);
        checkIfUserWasDeleted();
      });
    });
  });
});

async function checkIfUserWasDeleted() {
  const queryResult = await db.query('SELECT * FROM users WHERE id = 1');
  const userResult = queryResult.rows;
  expect(userResult).to.eql([]);
}
