const BlogPostService = require('../../services/BlogPost');

module.exports = async (_req, res) => {
  const allBlogPost = await BlogPostService.getAll();

  return res.status(200).json(allBlogPost);
};
