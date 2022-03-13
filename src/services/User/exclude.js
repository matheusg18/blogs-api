const { User } = require('../../sequelize/models');

module.exports = async (user = { email: '' }) => User.destroy({ where: { email: user.email } });
