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
    it('Logged in user should be able to get list of users', done => {
      chaiMethods.makePostRequest(
        url,
        '/register',
        {
          firstName: 'Kuba',
          lastName: 'Wacławski',
          email: 'kubawaclawski@gmail.com',
          password: 'łopata112244'
        },
        null,
        (err, res) => {
          chaiMethods.makePostRequest(
            url,
            '/login',
            {
              firstName: 'Kuba',
              lastName: 'Wacławski',
              email: 'kubawaclawski@gmail.com',
              password: 'łopata112244'
            },
            null,
            (err, res) => {
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
        }
      );
    });
  });
});
