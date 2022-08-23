const router = require('express').Router();
const controller = require('../controllers/adminController')
const multer = require("multer");
const auth = require('../middleware/auth')
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

router.get('/adminProfile', controller.viewProfile)
router.post('/changeProfile/:id', upload.single('avatar'), controller.changeProfile)


module.exports = router;