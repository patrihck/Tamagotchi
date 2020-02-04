const Joi = require('@hapi/joi');

const petModifierSchema = Joi.object({
  name: Joi.string(),
  property: Joi.string(),
  modifier: Joi.number()
});

module.exports = petModifierSchema;
