const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-json'));

describe('Register user', () => {
  describe('/POST', () => {
    it('Authentication should fail because of wrong password', done => {
      chai
        .request('http://127.0.0.1:3001')
        .post('/login')
        .send({
          email: 'email@email.com',
          lastname: 'Koń',
          firstname: 'Zdzisław',
          password: '@11!'
        })
        .end((err, res) => {
          expect(res).to.have.status(501);
          done();
          console.log(err);
        });
    });
  });
});
