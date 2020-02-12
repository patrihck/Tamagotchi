const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json'));
const testServer = require('./test-server-methods');

const user = {
  firstName: 'Jack',
  lastName: 'Brown',
  email: `jackbrown@gmail.com${testServer.getRandomId()}`,
  password: '1348ff34354gfrf'
};

let cookie;

describe('Get users', () => {
  before(async () => {
    await testServer.registerUser(user);
    cookie = await testServer.logInAndGetCookie(user);
  });
  it('Logged in user should be able to get list of users', async () => {
    const res = await chai
      .request(testServer.url)
      .get('/users')
      .set('Cookie', cookie);

    expect(res).to.have.status(200);
  });

  it('should result with unauthorized error', async () => {
    const res = await chai
      .request(testServer.url)
      .get('/users')
      .set('Cookie', '');

    expect(res).to.have.status(401);
  });
});
