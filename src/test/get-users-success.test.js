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
          firstName: 'Jack',
          lastName: 'Brown',
          email: 'jackbrown@gmail.com',
          password: '1348ff34354gfrf'
        },
        null,
        (err, res) => {
          chaiMethods.makePostRequest(
            url,
            '/login',
            {
              firstName: 'Jack',
              lastName: 'Brown',
              email: 'jackbrown@gmail.com',
              password: '1348ff34354gfrf'
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
        }
      );
    });
  });
});
