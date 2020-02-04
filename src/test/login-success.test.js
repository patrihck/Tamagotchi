const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const chaiMethods = require('./chai-helper-methods');
const config = require('config');
chai.use(chaiHttp);
chai.use(require('chai-json'));

const url = `http://${config.appConfig.host}:${config.appConfig.port}`;

describe('Login user', () => {
  describe('/POST', () => {
    chaiMethods.makePostRequest;
    it('registered user should be able to login', done => {
      chaiMethods.makePostRequest(
        url,
        '/register',
        {
          email: 'user@email.com',
          lastName: 'lastname',
          firstName: 'firstname',
          password: 'thepassword'
        },
        null,
        (err, res) => {
          chaiMethods.makePostRequest(
            url,
            '/login',
            {
              email: 'user@email.com',
              lastName: 'lastname',
              firstName: 'firstname',
              password: 'thepassword'
            },
            done,
            (err, res) => {
              expect(res).to.have.status(200);
            }
          );
        }
      );
    });

    it('unknown user should not be able to log in', done => {
      chaiMethods.makePostRequest(
        url,
        '/login',
        {
          email: 'unknownuser@emailemail.com',
          lastName: 'Jan',
          firstName: 'Nowak',
          password: '@@@###%^&kj3d'
        },
        done,
        (err, res) => {
          expect(res).to.have.status(401);
        }
      );
    });
  });
});
