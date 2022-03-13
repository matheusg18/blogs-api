const { User } = require('../../sequelize/models');
const NotFoundError = require('../../utils/NotFoundError');
const BadRequestError = require('../../utils/BadRequestError');

module.exports = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) throw new NotFoundError('email not found');
  if (user.password !== password) throw new BadRequestError('incorrect password');

  return true;
};
