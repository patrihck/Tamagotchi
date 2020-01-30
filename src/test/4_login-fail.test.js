const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('config');
const chaiMethods = require('./chai-helper-methods');
chai.use(chaiHttp);
chai.use(require('chai-json'));

const url = `http://${config.appConfig.host}:${config.appConfig.port}`;
const endpoint = '/login';

describe('Login user', () => {
  describe('/POST', () => {
    it('Authentication should fail because of wrong password', done => {
      chaiMethods.makePostRequest(
        url,
        endpoint,
        {
          email: 'email@email.com',
          lastName: 'Koń',
          firstname: 'Zdzisław',
          password: '@11!15616979879'
        },
        done,
        (err, res) => {
          expect(res).to.have.status(401);
        }
      );
    });
  });
});
