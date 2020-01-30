const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('config');
const chaiMethods = require('./chai-helper-methods');
chai.use(chaiHttp);
chai.use(require('chai-json'));

const url = `http://${config.appConfig.host}:${config.appConfig.port}`;
const endpoint = '/register';

describe('Register user', () => {
  describe('/POST', () => {
    it('it should add an user to database and return status 200', done => {
      chaiMethods.makePostRequest(
        url,
        endpoint,
        {
          email: 'email@email.com',
          lastName: 'Koń',
          firstName: 'Zdzisław',
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

describe('Register user', () => {
  describe('/POST', () => {
    it('it should result with 406 because of no email', done => {
      chaiMethods.makePostRequest(
        url,
        endpoint,
        {
          email: null,
          lastName: 'Koń',
          firstName: 'Zdzisław',
          password: 'OpOn555555555@11!'
        },
        done,
        (err, res) => {
          expect(res).to.have.status(406);
        }
      );
    });
  });
});

describe('Register user', () => {
  describe('/POST', () => {
    it('it should result with 406 because of too short password', done => {
      chaiMethods.makePostRequest(
        url,
        endpoint,
        {
          email: 'kameleon@email.com',
          lastName: 'Góra',
          firstName: 'Jan',
          password: '123'
        },
        done,
        (err, res) => {
          expect(res).to.have.status(406);
        }
      );
    });
  });
});

describe('Register user', () => {
  describe('/POST', () => {
    it('it should result with 406 because of no password', done => {
      chaiMethods.makePostRequest(
        url,
        endpoint,
        {
          email: 'kameleon@email.com',
          lastName: 'Góra',
          firstName: 'Jan',
          password: undefined
        },
        done,
        (err, res) => {
          expect(res).to.have.status(406);
        }
      );
    });
  });
});
