const BlogPostService = require('../../services/BlogPost');

module.exports = async (req, res) => {
  const id = +req.params.id;
  const postById = await BlogPostService.getById(id);

  return res.status(200).json(postById);
};
