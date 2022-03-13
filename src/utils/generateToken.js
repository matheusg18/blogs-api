const jwt = require('jsonwebtoken');

module.exports = (data = {}) => {
  const jwtConfig = { expiresIn: '5h', algorithm: 'HS256' };
  const token = jwt.sign({ data }, process.env.JWT_SECRET, jwtConfig);

  return token;
};
