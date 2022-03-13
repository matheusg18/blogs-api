const { BlogPost, User, Category } = require('../../sequelize/models');
const NotFoundError = require('../../utils/NotFoundError');
const UnauthorizedError = require('../../utils/UnauthorizedError');

module.exports = async ({ id, title, content, user = { email: '' } }) => {
  const actualBlogPostValue = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!actualBlogPostValue) throw new NotFoundError('Post does not exist');

  const isAuthor = actualBlogPostValue.dataValues.user.email === user.email;

  if (!isAuthor) throw new UnauthorizedError('Unauthorized user');

  await BlogPost.update({ title, content }, { where: { id } });

  return {
    title,
    content,
    userId: actualBlogPostValue.dataValues.userId,
    categories: actualBlogPostValue.dataValues.categories,
  };
};
