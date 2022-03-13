const express = require('express');
const rescue = require('express-rescue');
const BlogPostController = require('../controllers/BlogPost');
const auth = require('../middlewares/auth');
const validatePostCreate = require('../middlewares/validatePostCreate');
const validatePostUpdate = require('../middlewares/validatePostUpdate');

const router = express.Router();

router.get('/', auth, rescue(BlogPostController.getAll));

router.get('/search', auth, rescue(BlogPostController.search));

router.get('/:id', auth, rescue(BlogPostController.getById));

router.post('/', auth, validatePostCreate, rescue(BlogPostController.create));

router.put('/:id', auth, validatePostUpdate, rescue(BlogPostController.update));

router.delete('/:id', auth, rescue(BlogPostController.exclude));

module.exports = router;
