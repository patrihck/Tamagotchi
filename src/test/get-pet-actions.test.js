const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-json'));
const testServer = require('./test-server-methods');

const user = {
  email: `newUser${testServer.getRandomId()}@gmail.com`,
  password: '41512521523',
  firstName: 'Gregory',
  lastName: 'Mołotow'
};

let cookie;

describe('GET /petActions', () => {
  before(async () => {
    await testServer.registerUser(user);
    cookie = await testServer.logInAndGetCookie(user);
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
