const { BlogPost, User } = require('../../sequelize/models');
const NotFoundError = require('../../utils/NotFoundError');
const UnauthorizedError = require('../../utils/UnauthorizedError');

module.exports = async ({ id, user = { email: '' } }) => {
  const actualBlogPostValue = await BlogPost.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: ['email'] }],
  });

  if (!actualBlogPostValue) throw new NotFoundError('Post does not exist');

  const isAuthor = actualBlogPostValue.dataValues.user.email === user.email;

  if (!isAuthor) throw new UnauthorizedError('Unauthorized user');

  await BlogPost.destroy({ where: { id } });

  return true;
};
