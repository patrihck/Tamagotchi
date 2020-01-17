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
    method: 'GET',
    path: '/example',
    options: {
      handler: handlers.example,
      description: 'Example route',
      notes: 'Returns json',
      tags: ['api', 'test']
    }
  },
  {
    method: 'POST',
    path: '/login',
    options: {
      handler: handlers.login,
      description: 'Login route',
      tags: ['api, login']
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
  }
];
