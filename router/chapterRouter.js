const auth = require('../middleware/auth')
const router = require('express').Router();
const controller = require('../controllers/chapterController')

// quan ly chapter author
router.post('/createChapter/:id', controller.createChapter)
router.get('/editChapterAuthor/:id', controller.editChapter)
router.patch('/change-title-chapter/:id', auth.checkToken, controller.ChangeChapterTitleAuthor)
router.patch('/change-content-chapter/:id', auth.checkToken, controller.ChangeChapterContentAuthor)




// quan ly chapter admin
router.get('/viewDetailChapter/:id', controller.viewDetailChapter)
router.get('/viewDetailChapterPagination/:id', controller.viewDetailChapterPagination)
router.get('/editChapter/:id', controller.viewEditChapter)


router.patch('/change-title/:id', auth.checkToken, controller.ChangeChapterTitle)
router.patch('/change-content/:id', auth.checkToken, controller.ChangeChapterContent)

router.delete('/deleteChapter/:id', controller.deleteChapter)
module.exports = router