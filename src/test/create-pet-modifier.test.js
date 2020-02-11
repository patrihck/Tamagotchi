const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json'));
const testServer = require('./1_test-server-initialize.test');
const bcrypt = require('bcryptjs');
const db = require('../database/postgres/db-context');

const user = {
  email: 'createPetModifier@gmail.com',
  lastName: 'CreatePet',
  firstName: 'Modifier',
  password: 'createpefmodiFier'
};

const petModifier = {
  name: `petModifier${testServer.getRandomId()}`,
  property: 'mleko',
  modifier: 100
};

describe('Create a pet modifier', () => {
  before(async () => {
    const salt = await bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.email = testServer.getRandomId() + user.email;
    await db.addNewUser([
      user.firstName,
      hashedPassword,
      user.lastName,
      user.email
    ]);
  });

  it('new pet modifier should be added to database', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/login')
      .send(user);

    const cookie = res.header['set-cookie'][0].split(';')[0];
    const response = await chai
      .request(testServer.url)
      .post('/petModifiers')
      .set('Cookie', cookie)
      .send(petModifier);

    expect(response).to.have.status(200);
    await checkIfPetModifierWasAdded(petModifier.name);
  });

  it('should end with 401 because of no cookie', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/petModifiers')
      .send(petModifier);

    expect(res).to.have.status(401);
  });

  it('should end with 400 because of wrong petModifier name format', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/petModifiers')
      .send({
        name: 1,
        property: 'mleko',
        modifier: 100
      });

    expect(res).to.have.status(401);
  });

  it('should end with 400 because of wrong petModifier property format', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/petModifiers')
      .send({
        name: `petModifierName${testServer.getRandomId()}`,
        property: 1,
        modifier: 100
      });

    expect(res).to.have.status(401);
  });

  it('should end with 400 because of wrong petModifier modifier format', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/petModifiers')
      .send({
        name: `petModifierName${testServer.getRandomId()}`,
        property: 'mleko',
        modifier: 'yes'
      });

    expect(res).to.have.status(401);
  });
});

async function checkIfPetModifierWasAdded(name) {
  const petModifiers = await db.getPetModifierByName(name);
  if (petModifiers.length > 0) {
    expect(petModifiers[0].name).to.be.equal(petModifier.name);
    expect(petModifiers[0].property).to.be.equal(petModifier.property);
    expect(petModifiers[0].modifier).to.be.equal(petModifier.modifier);
  }
}
