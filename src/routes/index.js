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
      handler: handlers.login,
      description: 'Example route',
      notes: 'Returns json',
      tags: ['api', 'test']
    }
  },
  {
    method: 'GET',
    path: '/users',
    options: {
      handler: handlers.getUsers,
      description: 'Example route',
      notes: 'Returns json',
      tags: ['api', 'test'],
      auth: {
        strategy: 'restricted'
      }
    }
  },
  {
    method: 'PATCH',
    path: '/users/{id}',
    options: {
      handler: handlers.editUser
    }
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    options: {
      handler: handlers.deleteUser
    }
  }
];
