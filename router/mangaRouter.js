const router = require('express').Router();
const controller = require('../controllers/mangaController')
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


// quản lý author post
// view post manga
router.get('/viewCreateManga', controller.viewCreateManga)
// view pagination post manga
router.get('/viewPaginationMangaAuthor', controller.viewPaginationManga)
// view details manga
router.get('/viewDetailsAuthor/:id', controller.viewDetailsManga)
// post manga
router.post('/createManga/:id', controller.createManga)
// edit manga
router.get('/editMangaAuthor/:id', controller.editMangaAuthor)


//-------------------------------------------
//quản lý admin post
router.get('/viewAllManga', controller.viewAllManga)
router.get('/editManga/:id', controller.viewEditManga)
router.post('/editManga/:id', upload.single('avatar'), controller.editManga)
router.get('/viewDetailManga/:id', controller.viewDetailManga)
module.exports = router