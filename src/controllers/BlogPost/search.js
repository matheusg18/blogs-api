const BlogPostService = require('../../services/BlogPost');

module.exports = async (req, res) => {
  const { q: searchTerm } = req.query;
  const posts = await BlogPostService.search(searchTerm);

  res.status(200).json(posts);
};
