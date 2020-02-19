const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json'));
const testServer = require('./test-server-methods');
const petRepo = require('../database/repository/pet-repository');

const user = {
  email: `createPetModifier@gmail.com${testServer.getRandomId()}`,
  lastName: 'CreatePet',
  firstName: 'Modifier',
  password: 'createpefmodiFier'
};

const petModifier = {
  name: `petModifier${testServer.getRandomId()}`,
  property: 'mleko',
  modifier: 100
};

let cookie;

describe('Create a pet modifier', () => {
  before(async () => {
    await testServer.registerUser(user);
    cookie = await testServer.logInAndGetCookie(user);
  });

  it('new pet modifier should be added to database', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/petModifiers')
      .set('Cookie', cookie)
      .send(petModifier);

    expect(res).to.have.status(200);
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
  const existingPetModifier = await petRepo.getPetModifierByName(name);
  if (existingPetModifier !== undefined) {
    expect(existingPetModifier.name).to.be.equal(petModifier.name);
    expect(existingPetModifier.property).to.be.equal(petModifier.property);
    expect(existingPetModifier.modifier).to.be.equal(petModifier.modifier);
  }
}
