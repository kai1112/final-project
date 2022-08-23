const router = require('express').Router();
const controller = require('../controllers/reviewChapterController')


// using chapterController
router.get("/viewDetailChapter/:id", controller.getChapter);
router.get("/paginationChapter/:id", controller.paginationChapter);
//create chapter
router.post("/createChapter/:id", controller.createChapter);
router.get("/createChapter/:id", controller.viewCreateChapter);
// edit chapter
router.post("/editChapter/:id", controller.editChapter);
router.get("/editChapter/:id", controller.viewEditchapter);
//deleteChapter
router.delete("/deleteChapter/:id", controller.deleteChapter);
module.exports = router;
