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

  it('new pet modifier should be added to database', done => {
    chaiMethods.makePostRequest(
      testServer.url,
      '/login',
      user,
      null,
      (err, res) => {
        const cookie = res.header['set-cookie'][0].split(';')[0];
        chai
          .request(testServer.url)
          .post('/petModifiers')
          .set('Cookie', cookie)
          .send(petModifier)
          .end(async (err, res) => {
            expect(res).to.have.status(200);
            await checkIfPetModifierWasAdded(petModifier.name);
            done();
          });
      }
    );
  });

  it('should end with 401 because of no cookie', done => {
    chaiMethods.makePostRequest(
      testServer.url,
      '/petModifiers',
      petModifier,
      done,
      (err, res) => {
        expect(res).to.have.status(401);
      }
    );
  });

  it('should end with 400 because of wrong petModifier name format', done => {
    chaiMethods.makePostRequest(
      testServer.url,
      '/petModifiers',
      {
        name: 1,
        property: 'mleko',
        modifier: 100
      },
      done,
      (err, res) => {
        expect(res).to.have.status(401);
      }
    );
  });

  it('should end with 400 because of wrong petModifier property format', done => {
    chaiMethods.makePostRequest(
      testServer.url,
      '/petModifiers',
      {
        name: `petModifierName${testServer.getRandomId()}`,
        property: 1,
        modifier: 100
      },
      done,
      (err, res) => {
        expect(res).to.have.status(401);
      }
    );
  });

  it('should end with 400 because of wrong petModifier modifier format', done => {
    chaiMethods.makePostRequest(
      testServer.url,
      '/petModifiers',
      {
        name: `petModifierName${testServer.getRandomId()}`,
        property: 'mleko',
        modifier: 'yes'
      },
      done,
      (err, res) => {
        expect(res).to.have.status(401);
      }
    );
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
