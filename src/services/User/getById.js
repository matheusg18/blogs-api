const { User } = require('../../sequelize/models');
const NotFoundError = require('../../utils/NotFoundError');

module.exports = async (id) => {
  const userById = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!userById) throw new NotFoundError('User does not exist');

  return userById;
};
