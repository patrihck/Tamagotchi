// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const expect = chai.expect;

const init = require('../server.js');
chai.use(chaiHttp);
chai.use(require('chai-json'));

init.startServer();

// describe('GET', () => {
//   describe('/GET', () => {
//     it('it should GET a simple json', done => {
//       chai
//         .request('http://127.0.0.1:3001')
//         .get('/')
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res).to.be.a.json;
//           done();
//           console.log(err);
//         });
//     });
//   });
// });
