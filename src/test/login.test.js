const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const testServer = require('./test-server-methods');
const db = require('../database/postgres/db-context');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);
chai.use(require('chai-json'));

const user = {
  email: 'user@email.com',
  lastName: 'lastname',
  firstName: 'firstname',
  password: 'thepassword'
};

describe('User login', () => {
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
  it('registered user should be able to login', async () => {
    const res = await chai
      .request(testServer.url)
      .post('/login')
      .send(user);

    expect(res).to.have.status(200);
  });

  it('unknown user should not be able to log in', async () => {
    const unknownUserId = testServer.getRandomId();
    const res = await chai
      .request(testServer.url)
      .post('/login')
      .send({
        email: `${unknownUserId}unknownuser@emailemail.com`,
        lastName: 'Jan',
        firstName: 'Nowak',
        password: '@@@###%^&kj3d'
      });

    expect(res).to.have.status(401);
  });
});
