const init = require('../../server');
const userRepository = require('../repository/user-repository');
const petRepository = require('../repository/pet-repository');

async function query(queryString, params, req) {
  try {
    const response = await init.client.query(queryString, params);
    return response;
  } catch (err) {
    console.log(err);
    if (req !== undefined) {
      req.log(['database', 'query', 'error'], err);
    }
  }
}
