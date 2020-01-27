const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const db = require('../database/postgres/db-context');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);
chai.use(require('chai-json'));

describe('Edit user', () => {
  describe('/PATCH', () => {
    it('Existing user should be updated with new data', done => {
      const user = {
        email: 'editeduser@email.com',
        lastname: 'User',
        firstname: 'Edited',
        password: 'ihavejustbeenedited'
      };
      chai
        .request('http://127.0.0.1:3001')
        .patch('/users/:1')
        .send(user)
        .end(async (err, res) => {
          expect(res).to.have.status(200);
          checkIfUserWasEdited(user).then(() => {
            done();
          });
        });
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
