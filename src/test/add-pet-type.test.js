const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const chaiMethods = require('./chai-helper-methods');
chai.use(chaiHttp);
chai.use(require('chai-json'));
const testServer = require('./1_test-server-initialize.test');
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
    const salt = await bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.email = user.email + testServer.getRandomId();
    await db.addNewUser([
      user.firstName,
      hashedPassword,
      user.lastName,
      user.email
    ]);

    const res = await chai
      .request(testServer.url)
      .post('/login')
      .send(user);
    cookie = res.header['set-cookie'][0].split(';')[0];
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
