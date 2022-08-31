const router = require('express').Router();
const controller = require('../controllers/commentController')
const auth = require('../models/auth')

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



router.post('/createComment', auth.checkToken, controller.createComment)
router.delete('/deleteComment', auth.checkToken, controller.deleteComment)
router.post('/updateComment', auth.checkToken, controller.updateComment)
module.exports = router