const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiMethods = require('./chai-helper-methods');
const testServer = require('./test-server-initialize');
const nanoid = require('nanoid');
const db = require('../database/postgres/db-context');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json'));
const endpoint = '/register';

testServer.startServer();

const user = {
  email: 'email@email.com',
  lastName: 'Koń',
  firstName: 'Zdzisław',
  password: 'OpOn555555555@11!'
};

describe('Register user', () => {
  before(() => {
    const id = nanoid(30);
    user.email = id + user.email;
  });

  it('it should add an user to database and return status 200', done => {
    chaiMethods.makePostRequest(
      testServer.url,
      endpoint,
      user,
      done,
      (err, res) => {
        expect(res).to.have.status(200);
      }
    );
  });

  it('it should not be able to add already registered user', done => {
    chaiMethods.makePostRequest(
      testServer.url,
      endpoint,
      user,
      done,
      (err, res) => {
        expect(res).to.have.status(409);
      }
    );
  });

  it('it should result with 406 because of no email', done => {
    chaiMethods.makePostRequest(
      testServer.url,
      endpoint,
      {
        email: null,
        lastName: 'Koń',
        firstName: 'Zdzisław',
        password: 'OpOn555555555@11!'
      },
      done,
      (err, res) => {
        expect(res).to.have.status(400);
      }
    );
  });

  it('it should result with 406 because of too short password', done => {
    chaiMethods.makePostRequest(
      testServer.url,
      endpoint,
      {
        email: 'kameleon@email.com',
        lastName: 'Góra',
        firstName: 'Jan',
        password: '123'
      },
      done,
      (err, res) => {
        expect(res).to.have.status(400);
      }
    );
  });

  it('it should result with 406 because of no password', done => {
    chaiMethods.makePostRequest(
      testServer.url,
      endpoint,
      {
        email: 'kameleon@email.com',
        lastName: 'Góra',
        firstName: 'Jan',
        password: undefined
      },
      done,
      (err, res) => {
        expect(res).to.have.status(400);
      }
    );
  });
});
