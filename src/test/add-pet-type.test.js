const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json'));
const testServer = require('./test-server-methods');
const bcrypt = require('bcryptjs');
const db = require('../database/postgres/db-context');

const user = {
  firstName: 'UserToAddNewPetType',
  lastName: 'Kowalski',
  email: `addnewpettype@gmail.com${testServer.getRandomId()}`,
  password: '12345566788965'
};

const petType = {
  name: `TestProperty${testServer.getRandomId()}`,
  properties: [
    {
      name: 'Power',
      value: 19,
      weight: 345,
      valuePerTime: 4
    }
  ]
};

let cookie;

describe('Add new petType', () => {
  before(async () => {
    await testServer.registerUser(user);
    cookie = await testServer.logInAndGetCookie(user);
  });

  it('new pet type with pet properties should be added to database', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/petTypes')
      .set('Cookie', cookie)
      .send(petType);

    expect(res).to.have.status(200);
  });

  it('should fail because of no cookie', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/petTypes')
      .send(petType);
    expect(res).to.have.status(401);
  });

  it('should fail because of wrong pet type NAME format', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/petTypes')
      .set('Cookie', cookie)
      .send({
        name: 1,
        properties: [
          {
            name: 'Power',
            value: 19,
            weight: 345,
            valuePerTime: 4
          }
        ]
      });

    expect(res).to.have.status(400);
  });

  it('should fail because of wrong pet property NAME format', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/petTypes')
      .set('Cookie', cookie)
      .send({
        name: `TestProperty${testServer.getRandomId()}`,
        properties: [
          {
            name: 1,
            value: 19,
            weight: 345,
            valuePerTime: 4
          }
        ]
      });

    expect(res).to.have.status(400);
  });

  it('should fail because of wrong pet property VALUE format', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/petTypes')
      .set('Cookie', cookie)
      .send({
        name: `TestProperty${testServer.getRandomId()}`,
        properties: [
          {
            name: 1,
            value: 'A',
            weight: 345,
            valuePerTime: 4
          }
        ]
      });

    expect(res).to.have.status(400);
  });

  it('should fail because of wrong pet property WEIGHT format', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/petTypes')
      .set('Cookie', cookie)
      .send({
        name: `TestProperty${testServer.getRandomId()}`,
        properties: [
          {
            name: 1,
            value: 1,
            weight: 'A',
            valuePerTime: 4
          }
        ]
      });

    expect(res).to.have.status(400);
  });

  it('should fail because of wrong pet property VALUE PER TIME format', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/petTypes')
      .set('Cookie', cookie)
      .send({
        name: `TestProperty${testServer.getRandomId()}`,
        properties: [
          {
            name: 1,
            value: 1,
            weight: 345,
            valuePerTime: 'A'
          }
        ]
      });

    expect(res).to.have.status(400);
  });
});
