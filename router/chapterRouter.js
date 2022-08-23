const router = require('express').Router();
const controller = require('../controllers/chapterController')

// quan ly chapter author
router.post('/createChapter/:id', controller.createChapter)
router.get('/editChapterAuthor/:id', controller.editChapter)


// quan ly chapter admin
router.get('/viewDetailChapter/:id', controller.viewDetailChapter)
router.get('/viewDetailChapterPagination/:id', controller.viewDetailChapterPagination)
router.get('/editChapter/:id', controller.viewEditChapter)
router.post('/editChapter/:id', controller.editChapter)
router.delete('/deleteChapter/:id', controller.deleteChapter)
module.exports = router