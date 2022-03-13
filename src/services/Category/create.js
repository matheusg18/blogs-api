const { Category } = require('../../sequelize/models');

module.exports = async (name) => Category.create({ name });
