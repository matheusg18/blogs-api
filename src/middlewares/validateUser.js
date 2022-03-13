const { userSchema } = require('../utils/joiSchemas');
const BadRequestError = require('../utils/BadRequestError');

module.exports = (req, _res, next) => {
  const { displayName, email, password } = req.body;
  const { error } = userSchema.validate({ displayName, email, password });

  if (error) {
    return next(new BadRequestError(error.details[0].message));
  }

  return next();
};
