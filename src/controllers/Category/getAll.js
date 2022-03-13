const CategoryService = require('../../services/Category');

module.exports = async (_req, res) => {
  const categories = await CategoryService.getAll();

  return res.status(200).json(categories);
};
