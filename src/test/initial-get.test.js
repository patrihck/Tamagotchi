const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('config');

const init = require('../server.js');
chai.use(chaiHttp);
chai.use(require('chai-json'));

const url = `http://${config.appConfig.host}:${config.appConfig.port}`;

describe('GET', () => {
  describe('/GET', () => {
    it('it should GET a simple json', done => {
      chai
        .request(url)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.a.json;
          done();
          console.log(err);
        });
    });
  });
});
