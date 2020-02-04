const handlers = require('./../handlers');
const userIdSchema = require('../joi-schemas/user-id-schema');
const userSchema = require('../joi-schemas/user-schema');
const failHandler = require('../joi-fail-actions/fail-action');

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
      tags: ['api, register'],
      validate: { payload: userSchema, failAction: failHandler }
    }
  },
  {
    method: 'POST',
    path: '/login',
    options: {
      handler: handlers.login,
      description: 'Example route',
      notes: 'Returns json',
      tags: ['api', 'test'],
      validate: { payload: userSchema, failAction: failHandler }
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
      handler: handlers.editUser,
      validate: {
        params: userIdSchema,
        payload: userSchema,
        failAction: failHandler
      }
    }
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    options: {
      handler: handlers.deleteUser,
      validate: {
        params: userIdSchema,
        failAction: failHandler
      }
    }
  }
];
