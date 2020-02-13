const Joi = require('@hapi/joi');

const petSchema = Joi.object({
  name: Joi.string().required(),
  petTypeId: Joi.number()
});

module.exports = petSchema;
