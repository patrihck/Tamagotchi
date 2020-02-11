const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const chaiMethods = require('./chai-helper-methods');
chai.use(chaiHttp);
chai.use(require('chai-json'));
const testServer = require('./1_test-server-initialize.test');
const db = require('../database/postgres/db-context');

const user = {
  email: `${testServer.getRandomId()}simpleuser@email.com`,
  firstName: 'Simple',
  lastName: 'User',
  password: '434256t3ewf'
};

let userId;
let unknownUserId;

describe('Delete User', () => {
  before(async () => {
    await db.addNewUser([
      user.firstName,
      user.password,
      user.lastName,
      user.email
    ]);

    userId = (await db.findByEmail(user.email))[0].id;
    unknownUserId = testServer.getUnknownUserId();
  });

  it('Existing user should be deleted from db', async () => {
    const res = await chai.request(testServer.url).delete(`/users/${userId}`);
    expect(res).to.have.status(200);
    await checkIfUserWasDeleted(userId);
  });

  it('should fail because of unknown id', async () => {
    const res = await chai
      .request(testServer.url)
      .delete(`/users/${unknownUserId}`);
    expect(res).to.have.status(409);
  });

  it('should fail because of id equal to 0', async () => {
    const res = await chai.request(testServer.url).delete('/users/0');
    expect(res).to.have.status(400);
  });

  it('should fail because of non numeric id', async () => {
    const res = await chai.request(testServer.url).delete('/users/A');
    expect(res).to.have.status(400);
  });
});

async function checkIfUserWasDeleted(userId) {
  const usersResult = await db.findById(userId);
  expect(usersResult[0].isdeleted).to.eql(true);
}
