const { User } = require('../../sequelize/models');

module.exports = async () => User.findAll({ attributes: { exclude: ['password'] } });
