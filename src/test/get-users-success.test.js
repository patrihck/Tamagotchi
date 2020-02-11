const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json'));
const testServer = require('./1_test-server-initialize.test');
const bcrypt = require('bcryptjs');
const db = require('../database/postgres/db-context');

const user = {
  firstName: 'Jack',
  lastName: 'Brown',
  email: 'jackbrown@gmail.com',
  password: '1348ff34354gfrf'
};

describe('Get users', () => {
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
  it('Logged in user should be able to get list of users', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/login')
      .send(user);
    const cookie = res.header['set-cookie'][0].split(';')[0];

    const getResponse = await chai
      .request(testServer.url)
      .get('/users')
      .set('Cookie', cookie);

    expect(getResponse).to.have.status(200);
  });

  it('should result with unauthorized error', async () => {
    const res = await chai
      .request(testServer.url)
      .get('/users')
      .set('Cookie', '');

    expect(res).to.have.status(401);
  });
});
