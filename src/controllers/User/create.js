const UserService = require('../../services/User');
const generateToken = require('../../utils/generateToken');

module.exports = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  await UserService.create({ displayName, email, password, image });

  const token = generateToken({ email });

  return res.status(201).json({ token });
};
