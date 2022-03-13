const express = require('express');
const rescue = require('express-rescue');
const CategoryController = require('../controllers/Category');
const validateCategory = require('../middlewares/validateCategory');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, rescue(CategoryController.getAll));

router.post('/', auth, validateCategory, rescue(CategoryController.create));

module.exports = router;
