module.exports = (req, h) => {
  h.state('data', { firstVisit: false });
  return h.response('hello');
};
