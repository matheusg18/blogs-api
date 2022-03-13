const UserService = require('../../services/User');

module.exports = async (req, res) => {
  const id = +req.params.id;
  const userById = await UserService.getById(id);

  return res.status(200).json(userById);
};
