const Joi = require('@hapi/joi');

const schema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required()
});

module.exports = schema;
