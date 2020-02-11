const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json'));
const testServer = require('./1_test-server-initialize.test');
const db = require('../database/postgres/db-context');
const bcrypt = require('bcryptjs');

const user = {
  email: `newUser${testServer.getRandomId()}@gmail.com`,
  password: '41512521523',
  firstName: 'Gregory',
  lastName: 'Mołotow'
};

let cookie;

describe('GET /petActions', () => {
  before(async () => {
    await registerUser(user);
    await login(user);
  });
  it('should get the list of pet actions', async () => {
    const res = await chai
      .request(testServer.url)
      .get('/petActions')
      .set('Cookie', cookie);

    expect(res).to.have.status(200);
  });

  it('should result with 401 because of no cookie', async () => {
    const res = await chai.request(testServer.url).get('/petActions');
    expect(res).to.have.status(401);
  });
});

async function registerUser(user) {
  const salt = await bcrypt.genSaltSync();
  const hashedPassword = await bcrypt.hash(user.password, salt);
  await db.addNewUser([
    user.firstName,
    hashedPassword,
    user.lastName,
    user.email
  ]);
}

async function login(user) {
  const res = await chai
    .request(testServer.url)
    .post('/login')
    .send(user);
  cookie = res.header['set-cookie'][0].split(';')[0];
}
