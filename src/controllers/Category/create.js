const CategoryService = require('../../services/Category');

module.exports = async (req, res) => {
  const { name } = req.body;
  const createdCategory = await CategoryService.create(name);

  return res.status(201).json(createdCategory);
};
