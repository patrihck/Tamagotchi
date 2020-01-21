const init = require('../../server');

exports.query = async (queryString, params) => {
  try {
    const response = await init.client.query(queryString, params);
    return response;
  } catch (err) {
    console.log(err);
  }
};
