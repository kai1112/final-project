const router = require('express').Router();
const controller = require('../controllers/authorController')
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

router.get('/authorProfile', controller.viewProfile)
router.post('/changeProfile/:id',upload.single('avatar'), controller.changeProfile)
// create author 
router.get('/viewCreateAuthor', controller.viewCreateAuthor)
router.post('/createAuthor', controller.createAuthor)
// get all author
router.get('/getAllAuthor', controller.getAllAuthor)
router.post('/banAuthor', controller.banAuthor)
// gift point author
router.post('/giftPointAuthor', controller.giftPointAuthor)
module.exports = router;