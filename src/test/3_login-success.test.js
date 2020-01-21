const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-json'));

describe('Login user', () => {
  describe('/POST', () => {
    it('it should authenticate a user which is in DB', done => {
      chai
        .request('http://127.0.0.1:3001')
        .post('/login')
        .send({
          email: 'email@email.com',
          lastname: 'Koń',
          firstname: 'Zdzisław',
          password: 'OpOn@11!'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
          console.log(err);
        });
    });
  });
});
