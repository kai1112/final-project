const router = require('express').Router();
const controller = require('../controllers/authorController')
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

router.get('/authorProfile', auth.checkToken, auth.checkRoleAuthor, controller.viewProfile)
router.patch('/change-name', auth.checkToken, auth.checkRoleAuthor, controller.ChangeUserName)
router.patch('/change-des', auth.checkToken, controller.ChangeUserDes)
router.post('/change-avatar', auth.checkToken, auth.checkRoleAuthor, upload.single('avatar'), controller.ChangeUserAvatar)
router.patch('/change-email', auth.checkToken, auth.checkRoleAuthor, controller.ChangeUserEmail)
router.patch('/change-password', auth.checkToken, auth.checkRoleAuthor, controller.ChangeUserPassword)

// create author 
router.get('/viewCreateAuthor', auth.checkToken, auth.checkRoleAuthor, controller.viewCreateAuthor)
router.post('/createAuthor', auth.checkToken, auth.checkRoleAuthor, controller.createAuthor)
// get all author
router.get('/getAllAuthor', auth.checkToken, auth.checkRoleAuthor, controller.getAllAuthor)
router.post('/banAuthor', auth.checkToken, auth.checkRoleAuthor, controller.banAuthor)
// gift point author
router.post('/giftPointAuthor', auth.checkToken, auth.checkRoleAuthor, controller.giftPointAuthor)
// logout 
router.get('/logout', auth.checkToken, auth.checkRoleAuthor, controller.Logout)

module.exports = router;