const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-json'));

describe('Get users', () => {
  describe('/users', () => {
    it('User should be authorized to get the list of users', done => {
      chai
        .request('http://127.0.0.1:3001')
        .post('/login')
        .send({
          email: 'email@email.com',
          lastname: 'Koń',
          firstname: 'Zdzisław',
          password: 'OpOn@11!'
        })
        .then(res => {
          const cookie = res.header['set-cookie'][0].split(';')[0];
          chai
            .request('http://127.0.0.1:3001')
            .get('/users')
            .set('Cookie', cookie)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
              console.log(err);
            });
        });
    });
  });
});
