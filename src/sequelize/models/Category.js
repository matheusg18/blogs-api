const { DataTypes } = require('sequelize');

const CategoryTypes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', CategoryTypes, {
    timestamps: false,
    tableName: 'Categories',
  });

  return Category;
};
