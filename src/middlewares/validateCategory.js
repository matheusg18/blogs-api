const { categorySchema } = require('../utils/joiSchemas');
const BadRequestError = require('../utils/BadRequestError');

module.exports = (req, _res, next) => {
  const { name } = req.body;
  const { error } = categorySchema.validate({ name });

  if (error) {
    return next(new BadRequestError(error.details[0].message));
  }

  return next();
};
