const Joi = require('@hapi/joi');

const petTypeSchema = Joi.object({
  name: Joi.string(),
  properties: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      value: Joi.number(),
      weight: Joi.number(),
      valuePerTime: Joi.number()
    })
  )
});

module.exports = petTypeSchema;
