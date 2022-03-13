const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return next(new UnauthorizedError('Token not found'));

  try {
    // data = { email }
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;

    return next();
  } catch (error) {
    return next(new UnauthorizedError('Expired or invalid token'));
  }
};
