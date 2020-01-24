const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-json'));

describe('Edit user', () => {
  describe('/PATCH', () => {
    it('Existing user should be updated with new data', done => {
      chai
        .request('http://127.0.0.1:3001')
        .patch('/users/:1')
        .send({
          email: 'editeduser@email.com',
          lastname: 'User',
          firstname: 'Edited',
          password: 'ihavejustbeenedited'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
