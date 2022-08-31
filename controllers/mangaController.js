const MangaModel = require('../models/manga.model');
const ReviewMangaModel = require('../models/reviewManga')
const ReviewChapterModel = require('../models/reviewChapter')
const ChapterModel = require('../models/chapter.model')
const UserModel = require('../models/user.model')
const Follow = require('../models/library.model')





// quản lý manga của author post
module.exports.createManga = async (req, res) => {
    try {
        // console.log(req.body, req.params);
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
            res.json({
                status: 200,
                message: 'created successfully'
            })
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
        let listAuthor = []
        for (let i = 0; i < listManga.length; i++) {
            let author = await UserModel.findOne({ _id: listManga[i].author })
            listAuthor.push(author);
        }
        // console.log(47, listAuthor);

        let total = allManga.length
        if (allManga) {
            res.render('pages/admin/viewMangaAuthorPost/viewMangaAuthorPostEjs/viewMangaAuthorPost', { listAuthor, allManga, listManga, total: Math.ceil(total / 10) })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.viewPaginationManga = async (req, res) => {
    try {
        let allManga = await ReviewMangaModel.find().skip(req.query.limit * (req.query.page - 1))
            .limit(req.query.limit);
        let listAuthor = []
        for (let i = 0; i < allManga.length; i++) {
            let author = await UserModel.find({ _id: allManga[i].author })
            listAuthor.push(author)
        }
        let total = allManga.length

        if (allManga) {
            res.render('pages/admin/viewMangaAuthorPost/viewMangaAuthorPostEjs/viewpaginationMangaAuthorPost', { total, listAuthor, allManga })
        } else {
            res.json('khong co manga ton tai')
        }
    } catch (e) {
        console.log({ message: 'Error getting pagination manga' });
    }
}

module.exports.editMangaAuthor = async (req, res) => {
    try {
        let manga = await ReviewMangaModel.findOne({ _id: req.params.id });
        // console.log(manga);
        let author = await UserModel.findOne({ _id: manga.author })
        res.render('pages/admin/viewMangaAuthorPost/editMangaAuthorPost/editManga', { manga, author })
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

module.exports.ChangeMangaAuthorName = async (req, res) => {
    let { newName } = req.body
    console.log(119, newName);
    try {
        await ReviewMangaModel.updateOne({ _id: req.params.id }, { name: newName })
        res.json({ mess: 'success' })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.ChangeMangaAuthorDes = async (req, res) => {
    let { newDes } = req.body
    try {
        await ReviewMangaModel.updateOne({ _id: req.params.id }, { description: newDes })
        res.json({ mess: 'success' })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.ChangeMangaAuthorAvatar = async (req, res) => {
    try {
        let manga = await ReviewMangaModel.findOne({ _id: req.params.id })
        let path
        if (req.file == undefined) {
            path = manga.avatar
        } else {
            // console.log(manga.avatar);
            // fs.unlinkSync(manga.avatar)
            path = req.file.path;
        }
        await ReviewMangaModel.updateOne({ _id: req.params.id }, { avatar: path })
        res.json({ mess: "success" })
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports.ChangePrice = async (req, res) => {
    let { Price } = req.body
    // console.log(159, Price);
    // let userId = req.user._id
    try {
        let manga = await ReviewMangaModel.updateOne({ _id: req.params.id }, { price: Price })
        // console.log(manga);
        res.json({ mess: 'success' })
    } catch (error) {
        res.status(500).json(error)
    }
}


// quản lý manga đã được tạo
// view all manga
module.exports.viewAllManga = async (req, res) => {
    try {
        let allManga = await MangaModel.find()
        let listManga = await MangaModel.find().limit(10);
        // console.log(101, allManga);
        let listAuthor = []
        for (let i = 0; i < listManga.length; i++) {
            let author = await UserModel.findOne({ _id: allManga[i].author })
            listAuthor.push(author);
        }
        let total = allManga.length
        // console.log(author);
        if (allManga) {
            res.render('pages/admin/manageManga/viewAllManga/viewAllMangaEjs/viewAllManga', { listAuthor, allManga, listManga, total: Math.ceil(total / 10) })
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
        let listAuthor = []
        for (let i = 0; i < listManga.length; i++) {
            let author = await UserModel.find({ _id: allManga[i].author })
            listAuthor.push(author)
        }

        if (allManga) {
            res.render('pages/admin/manageManga/viewAllManga/viewAllMangaEjs/paginationManga', { listAuthor, allManga })
        } else {
            res.json('khong co manga ton tai')
        }
    } catch (e) {
        console.log({ message: 'Error getting pagination manga' });
    }
}
// edit manga
module.exports.viewEditManga = async (req, res) => {
    try {
        let manga = await MangaModel.findById(req.params.id);
        res.render('pages/admin/manageManga/editManga/editManga', { manga })
    } catch (e) {
        res.json(e)
    }
}

module.exports.viewDetailManga = async (req, res) => {
    try {
        const manga = await MangaModel.findOne({ _id: req.params.id });
        const chapter = await ChapterModel.find({ mangaID: req.params.id });
        if (!manga) {
            res.json("ko co manga nao");
        } else {
            res.render("pages/admin/manageManga/viewDetailManga/viewDetailManga", {
                manga,
                chapter,
            });
        }
    } catch (err) {
        res.json("err");
    }
}

module.exports.ChangeMangaName = async (req, res) => {
    let { newName } = req.body
    console.log(241, newName);
    try {
        await MangaModel.updateOne({ _id: req.params.id }, { name: newName })
        res.json({ status: 200 })
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports.ChangeMangaDes = async (req, res) => {
    let { newDes } = req.body
    try {
        await MangaModel.updateOne({ _id: req.params.id }, { description: newDes })
        res.json({ mess: 'success' })
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports.ChangeMangaAvatar = async (req, res) => {
    try {
        let manga = await MangaModel.findOne({ _id: req.params.id })
        let path
        if (req.file == undefined) {
            path = manga.avatar
        } else {
            path = req.file.path;
        }
        await MangaModel.updateOne({ _id: req.params.id }, { avatar: path })
        res.json({ mess: "success" })
    } catch (error) {
        res.status(500).json(error)
    }
}



//-----------------------------------------
module.exports.userViewManga = async (req, res) => {
    try {
        let allManga = await MangaModel.find()
        let listManga = await MangaModel.find().limit(10)
        let total = allManga.length
        if (allManga.length) {
            console.log(280, allManga);
        } else {
            console.log(282, 'No manga found');
        }
        res.json({ status: 200 })
    } catch (error) {
        res.json(err)
    }
}

module.exports.userViewPagination = async (req, res) => {
    try {
        let listManga = await MangaModel.find().skip(req.query.limit * (req.query.page - 1))
            .limit(req.query.limit);
        if (listManga) {
            console.log(297, listManga);
        }
        res.json({ status: 200 })
    } catch (error) {
        res.json(error)
    }
}

module.exports.userViewMangaDetail = async (req, res) => {
    try {
        const cookie = req.cookies;
        let manga = await MangaModel.findById(req.params.id).populate('author');
        let user = await UserModel.findById({ token: cookie.user })
        let buyed = manga.buyed
        let checked
        for (let i = 0; i < buyed.length; i++) {
            if (buyed[i] != user._id) {
                buyed.push(user._id)
            } else {
                checked = true
            }
        }
        if (manga) {
            let chapter = await ChapterModel.find({ mangaID: manga._id })
            let followers = await Follow.find({ mangaID: manga._id }).populate('userID')
            if (manga.price > 0 && user) {
                if (checked) {

                    console.log(309, manga, chapter, followers);
                } else if (req.body.accept && user.monney > manga.price) {
                    console.log('ban co muon mua chuyen khong');
                    let monney = user.monney - manga.price;
                    let user = await UserModel.findOneAndUpdate({ _id: user._id }, { monney: monney })
                    let manga = await MangaModel.findOneAndUpdate({ _id: manga._id }, { buyed: buyed })

                    console.log(309, manga, chapter, followers);
                } else {
                    console.log('ban khong co du tien de mua truyen');
                }
            } else if (manga.price > 0 && !user) {
                console.log('ban chua dang nhap');
            } else {
                console.log(309, manga, chapter, followers);
            }

        } else {
            console.log(312, 'chapter not found');
        }
        res.json({ status: 200 })
    } catch (error) {
        res.json(error)
    }
}