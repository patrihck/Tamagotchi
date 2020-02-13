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
  name: `petAction${testServer.getRandomId()}`,
  petModifierIds: [1]
};

const petModifier = {
  id: 1,
  name: `name${testServer.getRandomId()}`,
  property: 'property',
  modifier: 3,
  petActionId: null
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
    const petActionResult = (
      await testServer.init.client.query(
        'SELECT * FROM petActions WHERE name = $1',
        [petAction.name]
      )
    ).rows[0];

    const petModifiers = (
      await testServer.init.client.query(
        'SELECT * FROM petModifiers WHERE petActionId = $1',
        [petActionResult.id]
      )
    ).rows;
    expect(petActionResult.pettypeid).equal(petAction.petTypeId);
    expect(petActionResult.name).equal(petAction.name);
    expect(petModifiers.length).equal(1);
    expect(petActionResult.id).to.deep.equal(
      petModifiers[0].petactionid.toString()
    );
  });
});

async function seedDb() {
  const petModifiers = (
    await testServer.init.client.query(
      'SELECT * FROM petModifiers WHERE id = 1'
    )
  ).rows;

  if (petModifiers.length === 0) {
    await testServer.init.client.query(
      'INSERT INTO petModifiers (id, name, property, modifier, petActionId) values ($1, $2, $3, $4, $5)',
      [1, petModifier.name, petModifier.property, petModifier.modifier, null]
    );
  }
}
