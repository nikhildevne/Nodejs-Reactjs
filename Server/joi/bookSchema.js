const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().min(1).required(),
  author: Joi.string().min(1).required(),
  year: Joi.number().required(),
  genre: Joi.string().optional()
});

module.exports = bookSchema;