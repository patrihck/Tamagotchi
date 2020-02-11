const chai = require('chai');
const chaiHttp = require('chai-http');
const testServer = require('./1_test-server-initialize.test');
const nanoid = require('nanoid');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json'));
const endpoint = '/register';

const user = {
  email: `email@email.com${testServer.getRandomId()}`,
  lastName: 'Koń',
  firstName: 'Zdzisław',
  password: 'OpOn555555555@11!'
};

describe('Register user', () => {
  it('it should add an user to database and return status 200', async () => {
    const res = await chai
      .request(testServer.url)
      .post(endpoint)
      .send(user);
    expect(res).to.have.status(200);
  });

  it('it should not be able to add already registered user', async () => {
    const res = await chai
      .request(testServer.url)
      .post(endpoint)
      .send(user);
    expect(res).to.have.status(409);
  });

  it('it should result with 406 because of no email', async () => {
    const res = await chai
      .request(testServer.url)
      .post(endpoint)
      .send({
        email: null,
        lastName: 'Koń',
        firstName: 'Zdzisław',
        password: 'OpOn555555555@11!'
      });

    expect(res).to.have.status(400);
  });

  it('it should result with 406 because of too short password', async () => {
    const res = await chai
      .request(testServer.url)
      .post(endpoint)
      .send({
        email: 'kameleon@email.com',
        lastName: 'Góra',
        firstName: 'Jan',
        password: '123'
      });

    expect(res).to.have.status(400);
  });

  it('it should result with 406 because of no password', async () => {
    const res = await chai
      .request(testServer.url)
      .post(endpoint)
      .send({
        email: 'kameleon@email.com',
        lastName: 'Góra',
        firstName: 'Jan',
        password: undefined
      });

    expect(res).to.have.status(400);
  });
});
