const UserService = require('../../services/User');

module.exports = async (req, res) => {
  const { user } = req;
  await UserService.exclude(user);

  res.status(204).end();
};
