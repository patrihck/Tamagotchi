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
    it('User should not be authorized to get the list of users', done => {
      chaiMethods.makePostRequest(
        url,
        '/login',
        {
          email: 'email@email.com',
          lastName: 'Koń',
          firstName: 'Zdzisław',
          password: 'OpOn555555555@11!'
        },
        null,
        (err, res) => {
          const cookie = res.header['set-cookie'][0].split(';')[0];
          chaiMethods.makeGetRequest(
            url,
            endpoint,
            'Cookie',
            'restricted=Fe26.2**a465de02f12b31ac624238146ccf541499f67a3cdaf3058560f3461364746bc9*lTXVweV8fBBQkp3Sbde0MA*lOHT_v_sOUi5foU6yqTHB_Nv89mYg5jU0DLscTNtOV4**b3372b4b7abb1c2b2a9e99a2cccb3eeb8e9be6dee22f40a086ddafeb05ad5e73*JFjCNKfUxYqCx2i6ObkbKIox5pdC-R601USYVFAZmjs',
            done,
            (err, res) => {
              expect(res).to.have.status(401);
            }
          );
        }
      );
    });
  });
});
