const ChapterModel = require('../models/chapter.model')
const ReviewChapterModel = require('../models/reviewChapter')
const MangaModel = require('../models/manga.model')

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


module.exports.editChapter = async (req, res) => {
    try {
        res.render('pages/admin/viewChapterAuthorPost/editChapterAuthorPost/editChapter')
    } catch (e) {
        console.log(e);
    }
}






module.exports.viewDetailChapter = async (req, res) => {
    try {
        let chapter = await ChapterModel.findOne({ _id: req.params.id });
        let allChapter = await ChapterModel.find({ mangaID: chapter.mangaID });
        let listChapter = await ChapterModel.find({ mangaID: chapter.mangaID }).limit(1);
        console.log(76, listChapter);
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
            console.log(listChapter);
        } else {
            console.log('chapter not found')
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports.viewEditChapter = async (req, res) => {
    res.render("pages/admin/manageChapter/editChapter/editChapter");
}
module.exports.editChapter = async (req, res) => {
    try {
        const chapter = await ChapterModel.findById(req.params.id);
        if (!chapter) {
            res.json({ message: "Chapter not found" });
        } else {
            await ChapterModel.updateOne(req.body);
            res.json({ message: "Chapter update successfully" });
        }
    } catch (err) {
        res.json({ err });
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