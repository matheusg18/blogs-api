const joi = require('joi');

const displayName = joi.string().min(8).messages({
  'string.min': '"displayName" length must be at least 8 characters long',
});

const email = joi.string().email().required().messages({
  'string.email': '"email" must be a valid email',
  'any.required': '"email" is required',
});

const password = joi.string().length(6).required().messages({
  'string.length': '"password" length must be 6 characters long',
  'any.required': '"password" is required',
});

const categoryName = joi.string().required().messages({
  'any.required': '"name" is required',
});

const title = joi.string().required().messages({
  'any.required': '"title" is required',
});

const content = joi.string().required().messages({
  'any.required': '"content" is required',
});

const categoryIds = joi.array().required().messages({
  'any.required': '"categoryIds" is required',
});

const userSchema = joi.object({ displayName, email, password });
const loginSchema = joi.object({ email, password });
const categorySchema = joi.object({ name: categoryName });
const postCreateSchema = joi.object({ title, content, categoryIds });
const postUpdateSchema = joi.object({
  title,
  content,
  categoryIds: joi.forbidden().messages({
    'any.unknown': 'Categories cannot be edited',
  }),
});

module.exports = { categorySchema, loginSchema, postCreateSchema, postUpdateSchema, userSchema };
