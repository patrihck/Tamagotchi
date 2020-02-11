const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('config');
chai.use(chaiHttp);
chai.use(require('chai-json'));

const url = `http://${config.appConfig.host}:${config.appConfig.port}`;

describe('GET', () => {
  describe('/GET', () => {
    it('it should GET a simple json', async () => {
      const res = await chai.request(url).get('/');
      expect(res).to.have.status(200);
      expect(res).to.be.a.json;
    });
  });
});
