const init = require('../../server');

exports.query = async (queryString, params, req) => {
  try {
    const response = await init.client.query(queryString, params);
    return response;
  } catch (err) {
    console.log(err);
    if (req !== undefined) {
      req.log(['database', 'query', 'error'], err);
    }
  }
};
