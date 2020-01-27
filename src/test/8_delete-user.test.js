const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const db = require('../database/postgres/db-context');

chai.use(chaiHttp);
chai.use(require('chai-json'));

describe('Delete user', () => {
  describe('/DELETE', () => {
    it('Existing user should be deleted from db', done => {
      chai
        .request('http://127.0.0.1:3001')
        .delete('/users/:1')
        .end(async (err, res) => {
          expect(res).to.have.status(200);
          checkIfUserWasDeleted().then(() => {
            done();
          });
          console.log(err);
        });
    });
  });
});

async function checkIfUserWasDeleted () {
  const queryResult = await db.query('SELECT * FROM users WHERE id = 1');
  const userResult = queryResult.rows;
  expect(userResult).to.eql([]);
}
