const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../../sequelize/models');

module.exports = async (searchTerm) => {
  let posts;

  if (!searchTerm) {
    posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
  } else {
    posts = await BlogPost.findAll({
      where: { [Op.or]: [{ title: searchTerm }, { content: searchTerm }] },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
  }

  return posts;
};
