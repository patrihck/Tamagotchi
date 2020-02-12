const Joi = require('@hapi/joi');

const petActionSchema = Joi.object({
  petTypeId: Joi.number().min(1),
  name: Joi.string(),
  petModifierIds: Joi.array().items(Joi.number().min(1))
});

module.exports = petActionSchema;
