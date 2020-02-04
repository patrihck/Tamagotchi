const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('config');
const chaiMethods = require('./chai-helper-methods');
chai.use(chaiHttp);

const url = `http://${config.appConfig.host}:${config.appConfig.port}`;
const user = {
  email: 'createPetModifier@gmail.com',
  lastName: 'CreatePet',
  firstName: 'Modifier',
  password: 'createpefmodiFier'
};

describe('Create a pet modifier', () => {
  it('new pet modifier should be added to database', done => {
    chaiMethods.makePostRequest(url, '/register', user, null, (err, res) => {
      chaiMethods.makePostRequest(url, '/login', user, null, (err, res) => {
        const cookie = res.header['set-cookie'][0].split(';')[0];
        chai
          .request(url)
          .post('/petModifiers')
          .set('Cookie', cookie)
          .send({
            name: 'krowa',
            property: 'mleko',
            modifier: '100'
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });
});
