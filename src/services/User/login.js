const { User } = require('../../sequelize/models');
const BadRequestError = require('../../utils/BadRequestError');

module.exports = async ({ email, password }) => {
  const logged = await User.findOne({ where: { email, password } });

  if (!logged) {
    throw new BadRequestError('Invalid fields');
  }

  return true;
};
