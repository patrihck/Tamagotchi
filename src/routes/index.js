const handlers = require('./../handlers');

module.exports = [
  {
    method: 'GET',
    path: '/',
    options: {
      handler: handlers.home,
      description: 'Home route',
      notes: 'Returns simple string',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/register',
    options: {
      handler: handlers.register,
      description: 'Register route',
      tags: ['api, register']
    }
  },
  {
    method: 'POST',
    path: '/login',
    options: {
      handler: handlers.example,
      description: 'Example route',
      notes: 'Returns json',
      tags: ['api', 'test']
    }
  }
];
