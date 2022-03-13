const BlogPostService = require('../../services/BlogPost');

module.exports = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;
  const newBlogPost = await BlogPostService.create({ title, content, categoryIds, user });

  return res.status(201).json(newBlogPost);
};
