const init = require('../../server');

exports.query = async queryString => {
  try {
    const response = await init.client.query(queryString);
    return response;
  } catch (err) {
    console.log(err);
  }
};
