const { Category } = require('../../sequelize/models');

module.exports = async () => Category.findAll();
