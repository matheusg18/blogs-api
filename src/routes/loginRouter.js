const express = require('express');
const rescue = require('express-rescue');
const UserController = require('../controllers/User');
const validateLogin = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', validateLogin, rescue(UserController.login));

module.exports = router;
