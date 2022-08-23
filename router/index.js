const router = require("express").Router();
router.get('/', (req, res) => {
    res.render('./pages/user/manageMangaUser/viewAllMangaUser/viewAllMangaUser')
})

//using auth router
const authRoute = require("./authRouter")
router.use("/auth", authRoute)

// using author router
const authorRoute = require("./authorRouter")
router.use('/author', authorRoute)

// using user router
const userRoute = require("./userRouter")
router.use('/user', userRoute)


// using admin router
const adminRoute = require("./adminRouter")
router.use('/admin', adminRoute)


// using review manga router
const reviewMangaRoute = require("./reviewMangaRouter")
router.use('/reviewManga', reviewMangaRoute)


// using review chapter router
const reviewChapterRoute = require("./reviewChapterRouter")
router.use('/reviewChapter', reviewChapterRoute)


// using manga Router
const mangaRoute = require("./mangaRouter")
router.use('/manga', mangaRoute)

// using chapter router
const chapterRoute = require("./chapterRouter")
router.use('/chapter', chapterRoute)
module.exports = router;
