const { BlogPost, User, Category } = require('../../sequelize/models');
const NotFoundError = require('../../utils/NotFoundError');

module.exports = async (id) => {
  const postById = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!postById) throw new NotFoundError('Post does not exist');

  return postById;
};
