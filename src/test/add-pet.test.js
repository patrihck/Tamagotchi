const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json'));
const testServer = require('./test-server-methods');

const user = {
  firstName: 'New',
  lastName: 'TestUser',
  email: `adnewpet@gmail.com${testServer.getRandomId()}`,
  password: '12345566788965'
};

const pet = {
  petTypeId: 1,
  name: `NewPet${testServer.getRandomId()}`
};

let cookie;

describe('POST /pets', () => {
  before(async () => {
    await testServer.registerUser(user);
    cookie = await testServer.logInAndGetCookie(user);
  });

  it('should add new pet to db and response with 200', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/pets')
      .set('Cookie', cookie)
      .send(pet);
    expect(res).to.have.status(200);
    const petResult = (
      await testServer.init.client.query('SELECT * FROM pets WHERE name = $1', [
        pet.name
      ])
    ).rows[0];

    const userId = (
      await testServer.init.client.query(
        'SELECT * FROM users WHERE email = $1',
        [user.email]
      )
    ).rows[0].id;
    expect(petResult.pettypeid).equal(pet.petTypeId);
    expect(petResult.name).equal(pet.name);
    expect(petResult.userid.toString()).equal(userId);
  });

  it('should result with 400 beacuse of wrong name format', async () => {
    const wrongPet = {
      name: 1,
      petTypeId: 1
    };
    const res = await chai
      .request(testServer.url)
      .post('/pets')
      .set('Cookie', cookie)
      .send(wrongPet);
    expect(res).to.have.status(400);
  });

  it('should result with 400 beacuse of wrong petTypeId format', async () => {
    const wrongPet = {
      name: 'name',
      petTypeId: 'petTypeId'
    };
    const res = await chai
      .request(testServer.url)
      .post('/pets')
      .set('Cookie', cookie)
      .send(wrongPet);
    expect(res).to.have.status(400);
  });

  it('should result with 400 beacuse of no name in request', async () => {
    const wrongPet = {
      petTypeId: 1
    };
    const res = await chai
      .request(testServer.url)
      .post('/pets')
      .set('Cookie', cookie)
      .send(wrongPet);
    expect(res).to.have.status(400);
  });
});
