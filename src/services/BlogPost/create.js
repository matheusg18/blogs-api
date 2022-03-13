const Sequelize = require('sequelize');
const config = require('../../sequelize/config/config');
const { BlogPost, PostCategory, User, Category } = require('../../sequelize/models');
const BadRequestError = require('../../utils/BadRequestError');

const { Op } = Sequelize;
const sequelize = new Sequelize(process.env.NODE_ENV === 'test' ? config.test : config.development);

const checkCategoryIds = async (categoryIds = []) => {
  const matchedCategories = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });

  if (matchedCategories.length !== categoryIds.length) {
    throw new BadRequestError('"categoryIds" not found');
  }

  return true;
};

const getReturn = ({ title, content, userId, id }) => ({ title, content, userId, id });

module.exports = async ({ title, content, categoryIds = [], user = { email: '' } }) => {
  await checkCategoryIds(categoryIds);

  const { dataValues } = await User.findOne({
    where: { email: user.email },
    attributes: { includes: ['id'] },
  });
  const userId = dataValues.id;

  let newBlogPost;
  await sequelize.transaction(async (t) => {
    newBlogPost = await BlogPost.create({ title, content, userId }, { transaction: t });
    const postId = newBlogPost.dataValues.id;

    const PostCategoryValues = categoryIds.map((categoryId) => ({ categoryId, postId }));
    await PostCategory.bulkCreate(PostCategoryValues, { transaction: t });
  });

  return getReturn(newBlogPost);
};
