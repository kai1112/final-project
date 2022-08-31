const router = require('express').Router();
const controller = require('../controllers/mangaController')
const auth = require('../middleware/auth')
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
router.get('/viewCreateManga', auth.checkToken, auth.checkRoleAdmin, controller.viewCreateManga)
// view pagination post manga
router.get('/viewPaginationMangaAuthor', auth.checkToken, auth.checkRoleAdmin, controller.viewPaginationManga)
// view details manga
router.get('/viewDetailsAuthor/:id', auth.checkToken, auth.checkRoleAdmin, controller.viewDetailsManga)
// post manga
router.post('/createManga/:id', auth.checkToken, auth.checkRoleAdmin, controller.createManga)
// edit manga
router.get('/editMangaAuthor/:id', auth.checkToken, auth.checkRoleAdmin, controller.editMangaAuthor)

router.patch('/change-name/:id', auth.checkToken, auth.checkRoleAdmin, controller.ChangeMangaAuthorName)
router.patch('/change-des/:id', auth.checkToken, auth.checkRoleAdmin, controller.ChangeMangaAuthorDes)
router.post('/change-avatar/:id', auth.checkToken, auth.checkRoleAdmin, upload.single('avatar'), controller.ChangeMangaAuthorAvatar)
router.patch('/change-price/:id', auth.checkToken, auth.checkRoleAdmin, controller.ChangePrice)
//-------------------------------------------
//quản lý admin post
router.get('/viewAllManga', auth.checkToken, auth.checkRoleAdmin, controller.viewAllManga)
router.get('/viewPaginationManga', auth.checkToken, auth.checkRoleAdmin, controller.PaginationManga)
router.get('/editManga/:id', auth.checkToken, auth.checkRoleAdmin, controller.viewEditManga)

router.patch('/change-manga-name/:id', auth.checkToken, auth.checkRoleAdmin, controller.ChangeMangaName)
router.patch('/change-manga-des/:id', auth.checkToken, auth.checkRoleAdmin, controller.ChangeMangaDes)
router.post('/change-manga-avatar/:id', auth.checkToken, auth.checkRoleAdmin, upload.single('avatar'), controller.ChangeMangaAvatar)

router.get('/viewDetailManga/:id', auth.checkToken, auth.checkRoleAdmin, controller.viewDetailManga)

//-------------------------------------------
// quản lý manga User interface
router.get('/manga', controller.userViewManga)
router.get('/pagination', controller.userViewPagination)
router.get('/mangaDetail/:id', controller.userViewMangaDetail)
module.exports = router