const router = require('express').Router();
const controller = require('../controllers/categoryController')

router.get('/:id', controller.findMangaByCategory)
module.exports = router
