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

exports.makeGetRequest = (
  url,
  endpoint,
  headerName,
  headerValue,
  done,
  callback
) => {
  chai
    .request(url)
    .get(endpoint)
    .set(headerName, headerValue)
    .end((err, res) => {
      callback(err, res);
      console.log(err);
      done();
    });
};
