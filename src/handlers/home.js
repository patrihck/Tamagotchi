module.exports = (request, h) => {
  const retObject = { response: 'That is the reponse' };
  const response = h.response(retObject);
  response.type('application/json');
  return response;
};
