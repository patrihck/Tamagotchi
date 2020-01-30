const init = require('../../server');

exports.query = async (queryString, params, req) => {
  try {
    const response = await init.client.query(queryString, params);
    return response;
  } catch (err) {
    req.log(['database', 'query', 'error'], err);
  }
};

exports.findByEmail = async email => {
  const selectQuery = 'SELECT * FROM users WHERE email = $1';
  return (await init.client.query(selectQuery, [email])).rows;
};

exports.findById = async id => {
  const selectQuery = 'SELECT * FROM users WHERE id = $1';
  return (await init.client.query(selectQuery, [id])).rows;
};
