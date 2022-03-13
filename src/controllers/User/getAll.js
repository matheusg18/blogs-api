const UserService = require('../../services/User');

module.exports = async (_req, res) => {
  const allUsers = await UserService.getAll();

  return res.status(200).json(allUsers);
};
