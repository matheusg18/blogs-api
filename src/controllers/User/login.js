const UserService = require('../../services/User');
const generateToken = require('../../utils/generateToken');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  await UserService.login({ email, password });
  const token = generateToken({ email });

  return res.status(200).json({ token });
};
