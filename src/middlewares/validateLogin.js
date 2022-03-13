const { loginSchema } = require('../utils/joiSchemas');
const BadRequestError = require('../utils/BadRequestError');

module.exports = (req, _res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });

  if (error) {
    return next(new BadRequestError(error.details[0].message));
  }

  return next();
};
