const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-json'));

describe('Get users', () => {
  describe('/users', () => {
    it('User should not be authorized to get the list of users', done => {
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
          chai
            .request('http://127.0.0.1:3001')
            .get('/users')
            .set(
              'Cookie',
              'restricted=Fe26.2**a465de02f12b31ac624238146ccf541499f67a3cdaf3058560f3461364746bc9*lTXVweV8fBBQkp3Sbde0MA*lOHT_v_sOUi5foU6yqTHB_Nv89mYg5jU0DLscTNtOV4**b3372b4b7abb1c2b2a9e99a2cccb3eeb8e9be6dee22f40a086ddafeb05ad5e73*JFjCNKfUxYqCx2i6ObkbKIox5pdC-R601USYVFAZmjs'
            )
            .end((err, res) => {
              expect(res).to.have.status(401);
              done();
              console.log(err);
            });
        });
    });
  });
});
