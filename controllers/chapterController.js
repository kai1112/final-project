const ChapterModel = require('../models/chapter.model')
const ReviewChapterModel = require('../models/reviewChapter')
const MangaModel = require('../models/manga.model')


// review chapter
module.exports.editChapter = async (req, res) => {
    try {
        let chapter = await ReviewChapterModel.findById(req.params.id)
        res.render('pages/admin/viewChapterAuthorPost/editChapter/editChapter', { chapter })
    } catch (e) {
        console.log(e);
    }
}

module.exports.ChangeChapterTitleAuthor = async (req, res) => {
    let { newName } = req.body
    console.log(18, newName);
    try {
        await ReviewChapterModel.updateOne({ _id: req.params.id }, { title: newName })
        res.json({ status: 200 })
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports.ChangeChapterContentAuthor = async (req, res) => {
    let { newDes } = req.body
    try {
        await ReviewChapterModel.updateOne({ _id: req.params.id }, { content: newDes })
        res.json({ mess: 'success' })
    } catch (error) {
        res.status(500).json(error)
    }
}


// admin quan li
module.exports.createChapter = async (req, res) => {
    try {
        let chapter = await ReviewChapterModel.findOne({ _id: req.params.id })
        let manga = await MangaModel.findOne({ reviewManga: chapter.mangaID })
        if (chapter.stautus === 'review') {
            await ChapterModel.create({
                chap: chapter.chap,
                title: chapter.title,
                content: chapter.content,
                mangaID: manga._id
            })
            await ReviewChapterModel.updateOne({ _id: req.params.id }, { stautus: 'posted' })
        } else {
            console.log(12, 'manga da duoc post');
        }
        res.json({ status: 200 })
    } catch (err) {
        console.log(err);
    }
}

module.exports.viewDetailChapter = async (req, res) => {
    try {
        let chapter = await ChapterModel.findOne({ _id: req.params.id });
        let allChapter = await ChapterModel.find({ mangaID: chapter.mangaID });
        let listChapter = await ChapterModel.find({ mangaID: chapter.mangaID }).limit(1);
        // console.log(76, listChapter);
        let total = allChapter.length;
        res.render('pages/admin/manageChapter/viewDetailChapter/viewDetailChapter', { allChapter, listChapter, total: Math.ceil(total / 1) })
    } catch (err) {
        res.json({ message: "loix" });
    }
}
module.exports.viewDetailChapterPagination = async (req, res) => {
    try {
        // console.log(85, req.params.id);
        // console.log(86, req.query)
        let chapter = await ChapterModel.findOne({ _id: req.params.id });
        let listChapter = await ChapterModel.find({ mangaID: chapter.mangaID }).skip(req.query.limit * (req.query.page - 1))
            .limit(req.query.limit);
        if (listChapter) {
            res.render('pages/admin/manageChapter/viewDetailChapter/paginationChapter', { listChapter })
            // console.log(listChapter);
        } else {
            console.log('chapter not found')
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports.viewEditChapter = async (req, res) => {
    try {
        let chapter = await ChapterModel.findById(req.params.id)
        res.render("pages/admin/manageChapter/editChapter/editChapter", { chapter });
    } catch (err) {
        res.json(err)
    }
}

module.exports.ChangeChapterTitle = async (req, res) => {
    let { newName } = req.body
    try {
        await ChapterModel.updateOne({ _id: req.params.id }, { title: newName })
        res.json({ status: 200 })
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports.ChangeChapterContent = async (req, res) => {
    let { newDes } = req.body
    try {
        await ChapterModel.updateOne({ _id: req.params.id }, { content: newDes })
        res.json({ mess: 'success' })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.deleteChapter = async (req, res) => {
    try {
        const chapter = await ChapterModel.findOne({ _id: req.params.id });
        if (chapter) {
            await ChapterModel.findByIdAndDelete(chapter._id);
            res.json({ message: "delete chapter successfully" });
        } else {
            res.json({ message: "Chapter not found" });
        }
    } catch (err) {
        res.json(err);
    }
}

// chapter user
module.exports.viewChapter = async (req, res) => {
    try {

    } catch (err) {
        res.json(err)
    }
}

module.exports.viewPaginationChapter = async (req, res) => {
    try {

    } catch (err) {
        res.json(err)
    }
}