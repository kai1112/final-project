const MangaModel = require('../models/manga.model');
const ReviewMangaModel = require('../models/reviewManga')
const ReviewChapterModel = require('../models/reviewChapter')
const ChapterModel = require('../models/chapter.model')

// quản lý manga của author post
module.exports.createManga = async (req, res) => {
    try {
        console.log(req.body, req.params);
        let manga = await ReviewMangaModel.findOne({ _id: req.params.id })
        let price = ''
        if (req.body.price === "") {
            price = manga.price
        } else {
            price = req.body.price
        }
        if (manga.stautus === 'review') {
            await MangaModel.create({
                avatar: manga.avatar,
                category: manga.category,
                name: manga.name,
                author: manga.author,
                reviewManga: manga._id,
                description: manga.description,
                views: manga.view,
                like: manga.like,
                price: price,
            })
            await ReviewMangaModel.updateOne({ _id: req.params.id }, { stautus: 'posted' })
        } else {
            console.log(12, 'manga da duoc post');
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports.viewCreateManga = async (req, res) => {
    try {
        let allManga = await ReviewMangaModel.find()
        let listManga = await ReviewMangaModel.find().limit(10);
        let total = allManga.length
        if (allManga) {
            res.render('pages/admin/viewMangaAuthorPost/viewMangaAuthorPostEjs/viewMangaAuthorPost', { allManga, listManga, total: Math.ceil(total / 10) })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.viewPaginationManga = async (req, res) => {
    try {
        let allManga = await ReviewMangaModel.find().skip(req.query.limit * (req.query.page - 1))
            .limit(req.query.limit);
        if (allManga) {
            res.render('pages/admin/viewMangaAuthorPost/viewMangaAuthorPostEjs/viewpaginationMangaAuthorPost', { allManga })
        } else {
            res.json('khong co manga ton tai')
        }
    } catch (e) {
        console.log({ message: 'Error getting pagination manga' });
    }
}

module.exports.editManga = async (req, res) => {
    try {
        res.render('pages/admin/viewMangaAuthorPost/editMangaAuthorPost/editManga')
    } catch (e) {
        console.log(e);
    }
}

module.exports.viewDetailsManga = async (req, res) => {
    try {
        // const user = await UserModel.findOne({ token: cookies.user });
        const manga = await ReviewMangaModel.findOne({ _id: req.params.id });
        // console.log(manga);
        const chapter = await ReviewChapterModel.find({ mangaID: req.params.id });
        // console.log(71, chapter);
        if (!manga) {
            res.json("ko co manga nao");
        } else {
            res.render("pages/admin/viewMangaAuthorPost/viewDetailMangaAuthorPost/viewDetails", {
                manga,
                chapter,
            });
            // console.log(manga);
        }
    } catch (err) {
        res.json("err");
    }
}


// quản lý manga đã được tạo
// view all manga
module.exports.viewAllManga = async (req, res) => {
    try {
        let allManga = await MangaModel.find()
        let listManga = await MangaModel.find().limit(10);
        let total = allManga.length
        if (allManga) {
            res.render('pages/admin/manageManga/viewAllManga/viewAllMangaEjs/viewAllManga', { allManga, listManga, total: Math.ceil(total / 10) })
        } else {
            console.log('khong co manga')
        }
    } catch (e) {
        console.log(e)
    }
}
// phân trang manga
module.exports.PaginationManga = async (req, res) => {
    try {
        let allManga = await MangaModel.find().skip(req.query.limit * (req.query.page - 1))
            .limit(req.query.limit);
        if (allManga) {
            res.render('pages/admin/manageManga/viewAllManga/viewAllMangaEjs/paginationManga', { allManga })
        } else {
            res.json('khong co manga ton tai')
        }
    } catch (e) {
        console.log({ message: 'Error getting pagination manga' });
    }
}
// edit manga
module.exports.viewEditManga = async (req, res) => {
    console.log("a");
    res.render('pages/admin/manageManga/editManga/editManga')

}

module.exports.editManga = async (req, res) => {
    const mangaID = req.params.id;
    try {
        const manga = await MangaModel.findOne({ _id: mangaID });
        let avatar, category, description, price
        console.log(req.file);
        if (req.file == undefined) {
            avatar = manga.avatar
        } else {
            avatar = "/" + req.file.path
        }
        if (req.body.category === '') {
            category = manga.category
        } else {
            category = req.body.category
        }
        if (req.body.description === '') {
            description = manga.description
        } else {
            description = req.body.description
        }
        if (req.body.price === '') {
            price = manga.price
        } else {
            price = req.body.price
        }

        if (!manga) {
            res.json({ message: "manga khong ton tai" });
        } else {
            await MangaModel.findOneAndUpdate(
                {
                    _id: mangaID,
                },
                {
                    avatar: avatar,
                    category: category,
                    description: description,
                }
            );
            res.json({
                status: 200,
                message: "success"
            });
        }
    } catch (err) {
        res.json({ message: "loi 3" });
    }
};
module.exports.viewDetailManga = async (req, res) => {
    try {
        // const user = await UserModel.findOne({ token: cookies.user });
        // console.log(req.params.id);
        const manga = await MangaModel.findOne({ _id: req.params.id });
        console.log(186, manga);
        const chapter = await ChapterModel.find({ mangaID: req.params.id });
        console.log(188, chapter);
        if (!manga) {
            res.json("ko co manga nao");
        } else {
            res.render("pages/admin/manageManga/viewDetailManga/viewDetailManga", {
                manga,
                chapter,
            });
            // console.log(manga);
        }
    } catch (err) {
        res.json("err");
    }
}