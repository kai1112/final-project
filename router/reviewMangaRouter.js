const router = require('express').Router();
const controller = require('../controllers/reviewMangaController')
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const arr = file.originalname.split(".");
    const ext = arr[arr.length - 1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${ext}`);
  },
});
const upload = multer({ storage: storage });


// view all managa author created
router.get('/viewAllManga', controller.viewAllMangaAuthorCreated)
//view page author's create  manga 
router.get('/createManga', controller.viewMangaAuthorCreated)
router.post('/createManga', upload.single('avatar'), controller.createMangaAuthor)
// view detail manga
router.get('/viewDetails/:id', controller.viewDetails)
// view edit manga
router.get('/editManga/:id', controller.viewEditManga)
router.post('/editManga/:id', upload.single('avatar'), controller.editManga)
router.delete('/deleteManga/:id', controller.deleteManga)
module.exports = router