const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.use(require('chai-json'));

exports.makePostRequest = (url, endpoint, data, done, callback) => {
  chai
    .request(url)
    .post(endpoint)
    .send(data)
    .end((err, res) => {
      callback(err, res);
      console.log(err);
      done();
    });
};
