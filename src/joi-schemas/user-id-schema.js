const Joi = require('@hapi/joi');

const userIdSchema = Joi.object({ id: Joi.number().min(1) });

module.exports = userIdSchema;
