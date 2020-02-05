const Joi = require('@hapi/joi');

const petTypechema = Joi.object({
  name: Joi.string(),
  value: Joi.number(),
  weight: Joi.number(),
  valuePerTime: Joi.number()
});

module.exports = petTypechema;
