const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-json'));

describe('Register user', () => {
  describe('/POST', () => {
    it('it should add an user to database and return status 200', done => {
      chai
        .request('http://127.0.0.1:3001')
        .post('/register')
        .send({
          email: 'email@email.com',
          lastname: 'Koń',
          firstname: 'Zdzisław',
          password: 'OpOn@11!'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
