const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const chaiMethods = require('./chai-helper-methods');
const config = require('config');
chai.use(chaiHttp);
chai.use(require('chai-json'));

const url = `http://${config.appConfig.host}:${config.appConfig.port}`;
const endpoint = '/login';

describe('Login user', () => {
  describe('/POST', () => {
    it('registered user should be able to login', done => {
      chaiMethods.makePostRequest(
        url,
        endpoint,
        {
          email: 'email@email.com',
          lastName: 'Koń',
          firstname: 'Zdzisław',
          password: 'OpOn555555555@11!'
        },
        done,
        (err, res) => {
          expect(res).to.have.status(200);
        }
      );
    });
  });
});
