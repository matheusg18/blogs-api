const express = require('express');
const rescue = require('express-rescue');
const UserController = require('../controllers/User');
const validateUser = require('../middlewares/validateUser');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, rescue(UserController.getAll));

router.get('/:id', auth, rescue(UserController.getById));

router.post('/', validateUser, rescue(UserController.create));

router.delete('/me', auth, rescue(UserController.exclude));

module.exports = router;
