const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json'));
const testServer = require('./test-server-methods');

const user = {
  firstName: 'Pet',
  lastName: 'Action',
  email: `adnewpetAction@gmail.com${testServer.getRandomId()}`,
  password: '12345566788965'
};

const petAction = {
  petTypeId: 1,
  name: 'Nakarm',
  petModifierIds: [1]
};

const petModifier = {
  id: 1,
  name: `name${testServer.getRandomId()}`,
  property: 'property',
  modifier: 3
};

let cookie;

describe('POST /petActions', () => {
  before(async () => {
    await seedDb();
    await testServer.registerUser(user);
    cookie = await testServer.logInAndGetCookie(user);
  });

  it('should add new pet action to db and response with 200', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/petActions')
      .set('Cookie', cookie)
      .send(petAction);
    expect(res).to.have.status(200);
    const petActionResult = await testServer.init.client.query(
      'SELECT * FROM petModifiers WHERE name = $1',
      [petModifier.name]
    ).rows[0];
    expect(petActionResult.petTypeId).equal(petAction.petTypeId);
  });
});

async function seedDb() {
  try {
    await testServer.init.client.query(
      'INSERT INTO petModifiers (id, name, property, modifier) values ($1, $2, $3, $4)',
      [
        petModifier.id,
        petModifier.name,
        petModifier.property,
        petModifier.modifier
      ]
    );
  } catch (err) {}
}
