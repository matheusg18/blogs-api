const BlogPostService = require('../../services/BlogPost');

module.exports = async (req, res) => {
  const id = +req.params.id;
  const { title, content } = req.body;
  const { user } = req;
  const updatedPost = await BlogPostService.update({ id, title, content, user });

  return res.status(200).json(updatedPost);
};
