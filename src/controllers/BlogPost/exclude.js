const BlogPostService = require('../../services/BlogPost');

module.exports = async (req, res) => {
  const id = +req.params.id;
  const { user } = req;
  await BlogPostService.exclude({ id, user });

  return res.status(204).end();
};
