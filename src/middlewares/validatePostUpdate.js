const { postUpdateSchema } = require('../utils/joiSchemas');
const BadRequestError = require('../utils/BadRequestError');

module.exports = (req, _res, next) => {
  const { title, content, categoryIds } = req.body;
  const { error } = postUpdateSchema.validate({ title, content, categoryIds });

  if (error) {
    return next(new BadRequestError(error.details[0].message));
  }

  return next();
};
