const { User } = require('../../sequelize/models');
const ConflictError = require('../../utils/ConflictError');

module.exports = async ({ displayName, email, password, image }) => {
  try {
    const result = await User.create({ displayName, email, password, image });
    return result;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ConflictError('User already registered');
    }

    throw error;
  }
};
