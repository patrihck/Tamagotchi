const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('config');
const chaiMethods = require('./chai-helper-methods');
chai.use(chaiHttp);
chai.use(require('chai-json'));

const url = `http://${config.appConfig.host}:${config.appConfig.port}`;
const endpoint = '/users';

describe('Get users', () => {
  describe('/users', () => {
    it('User should be authorized to get the list of users', done => {
      chaiMethods.makePostRequest(
        url,
        '/login',
        {
          email: 'email@email.com',
          lastname: 'Koń',
          firstname: 'Zdzisław',
          password: 'OpOn555555555@11!'
        },
        null,
        (err, res) => {
          const cookie = res.header['set-cookie'][0].split(';')[0];
          chaiMethods.makeGetRequest(
            url,
            endpoint,
            'Cookie',
            cookie,
            done,
            (err, res) => {
              expect(res).to.have.status(200);
            }
          );
        }
      );
    });
  });
});
