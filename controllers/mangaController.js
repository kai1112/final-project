const MangaModel = require('../models/manga.model');
const ReviewMangaModel = require('../models/reviewManga')
const ReviewChapterModel = require('../models/reviewChapter')
const ChapterModel = require('../models/chapter.model')
const UserModel = require('../models/user.model')
const Follow = require('../models/library.model')
const fs = require('fs');
const slug = require('slugify');
const commentModel = require('../models/comment.model');
const CategoryModel = require('../models/category.model');
const CommentModel = require('../models/comment.model');


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
                slug: slug(manga.name)
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
        console.log(manga);
        let author = await UserModel.findOne({ id: manga.author })
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
            fs.unlinkSync(manga.avatar)
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
        let allManga = await MangaModel.find().populate('author')
        let listManga = await MangaModel.find().populate('author').limit(10);
        // console.log(101, allManga);
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
        let allManga = await MangaModel.find().populate('author').skip(req.query.limit * (req.query.page - 1))
            .limit(req.query.limit);
        // console.log(allManga);
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

module.exports.userViewMangaDetail = async (req, res) => {
    try {
        const cookie = req.cookies;
        let mangaDetail = await MangaModel.findOne({ slug: req.params.slug }).populate('author');
        // console.log(279, mangaDetail);
        let manga = await MangaModel.find().sort({ views: 'asc' })
        let category = await CategoryModel.find().sort({ name: 'asc' })
        let user = await UserModel.find().sort({ buyed: 'desc' }).limit(10)
        let userDetails
        if (cookie) {
            userDetails = await UserModel.findOne({ token: cookie.user })
        }
        // console.log(288, userDetails);
        let buyed = mangaDetail.buyed
        let checked = false
        if (userDetails) {
            let userID = buyed.filter((id) => {
                return id === userDetails.id
            })
            if (userID[0] === userDetails.id) {
                console.log(319, userID);
                checked = true
            }
        }
        if (mangaDetail) {
            let comments = await CommentModel.find({ mangaID: mangaDetail.slug }).populate('userID')
            let comment
            if (userDetails) {
                comment = await CommentModel.find({ mangaID: mangaDetail.slug, userID: userDetails._id })
            }
            let chapter = await ChapterModel.find({ mangaID: mangaDetail._id })
            let followers = await Follow.find({ mangaID: mangaDetail._id }).populate('userID')
            let follow
            if (userDetails) {
                follow = await Follow.findOne({ mangaID: mangaDetail._id, userID: userDetails.id })
            }
            // console.log(311, comments);
            res.render('pages/home/page/page', { mangaDetail, chapter, followers, userDetails, follow, comments, comment, checked, manga, category, user, userDetails })
        } else {
            console.log(312, 'chapter not found');
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.userViewPagination = async (req, res) => {
    try {
        let listManga = await MangaModel.find().skip(10 * (req.query.page - 1))
            .limit(10);
        // console.log(listManga);
        let chapter = []
        for (let i = 0; i < listManga.length; i++) {
            let chap = await ChapterModel.find({ mangaID: listManga[i]._id }).sort({ chap: 'asc' })
            chapter.push(chap)
        }
        if (listManga) {
            res.render('pages/home/home/pagination', { listManga, chapter })
            // console.log(297, listManga);
        }
        // res.json({ status: 200 })
    } catch (error) {
        console.log(error)
    }
}

module.exports.HomePage = async (req, res) => {
    try {
        let manga = await MangaModel.find().sort({ views: 'desc' }).limit(5)
        let listManga = await MangaModel.find().skip(10 * (req.query.page - 1)).limit(10).sort({ views: 'asc' });
        // console.log(manga);
        let category = await CategoryModel.find().sort({ name: 'asc' })
        let muaNhieu = await MangaModel.find().sort({ buyed: 'desc' }).limit(7)
        let user = await UserModel.find().sort({ buyed: 'desc' }).limit(10)
        let comment = await CommentModel.find().sort({ like: 'desc' }).populate("userID").limit(10)
        // console.log(category);
        let total = Math.ceil(manga.length / 10)
        let chapter = []
        for (let i = 0; i < listManga.length; i++) {
            let chap = await ChapterModel.find({ mangaID: listManga[i]._id }).sort({ chap: 'asc' })
            chapter.push(chap)
        }
        // console.log(user);
        res.render('pages/home/home/home', { manga, chapter, category, muaNhieu, user, comment, total, listManga })
    } catch (e) {
        console.log(e);
    }
}

module.exports.userViewChap = async (req, res) => {
    try {
        const cookie = req.cookies;
        let manga = await MangaModel.find().sort({ views: 'asc' })
        let mangaDetail = await MangaModel.findOne({ slug: req.params.slug }).populate('author');
        // console.log(368, mangaDetail);

        let user = await UserModel.find().sort({ buyed: 'desc' }).limit(10)
        let category = await CategoryModel.find().sort({ name: 'asc' })

        let chapter = await ChapterModel.findOne({ mangaID: mangaDetail.id, chap: req.params.chap })
        let allChapter = await ChapterModel.find({ mangaID: mangaDetail.id })

        let comment = await commentModel.find({ chapterID: chapter.id }).populate('userID').sort({ reactionn: 'asc' }).limit(10)
        let allComment = await commentModel.find({ chapterID: chapter.id }).populate('userID').sort({ reactionn: 'asc' })
        let total = Math.ceil((allComment.length + 1) / (comment.length + 1))

        let buyed = mangaDetail.buyed
        let checked = false
        let userDetail

        if (cookie) {
            userDetail = await UserModel.findOne({ token: cookie.user })
        }
        if (userDetail) {
            let userID = buyed.filter((id) => {
                return id === userDetail.id
            })
            if (userID === userDetail.id) {
                checked = true
            } else {
                buyed.push(userDetail.id)
            }
        }
        if (mangaDetail.price > 0 && userDetail) {
            if (checked) {
                let chapterUpdate = await ChapterModel.updateOne({ _id: chapter._id }, { $inc: { views: 1 } })
                let mangaUpdate = await MangaModel.updateOne({ _id: chapter.mangaID }, { $inc: { views: 1 } })
                res.render('pages/Home/read/read', { chapter, allChapter, comment, total, manga, category, user, mangaDetail })
            } else if (userDetail.monney >= mangaDetail.price) {
                userDetail.buyed.push(mangaDetail.id)
                let monney = userDetail.monney - mangaDetail.price;

                let user1 = await UserModel.findOneAndUpdate({ _id: userDetail._id }, { monney: monney, buyed: userDetail.buyed })
                let manga1 = await MangaModel.findOneAndUpdate({ _id: mangaDetail._id }, { buyed: buyed })
                let chapterUpdate = await ChapterModel.updateOne({ _id: chapter._id }, { $inc: { views: 1 } })
                let mangaUpdate = await MangaModel.updateOne({ _id: chapter.mangaID }, { $inc: { views: 1 } })
                res.render('pages/Home/read/read', { chapter, allChapter, comment, total, manga, category, user, mangaDetail })
            } else {
                console.log('ban khong co du tien de mua truyen');
            }
        } else if (mangaDetail.price > 0 && !user) {
            console.log('ban chua dang nhap');
        } else {
            let chapterUpdate = await ChapterModel.updateOne({ _id: chapter._id }, { $inc: { views: 1 } })
            let mangaUpdate = await MangaModel.updateOne({ _id: chapter.mangaID }, { $inc: { views: 1 } })
            res.render('pages/Home/read/read', { chapter, allChapter, comment, total, manga, category, user, mangaDetail })
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports.getpaginationComment = async (req, res) => {
    try {
        // console.log(391, req.query.page);
        let manga = await MangaModel.findOne({ slug: req.params.slug })
        let chapter = await ChapterModel.findOne({ mangaID: manga.id, chap: req.params.chap })
        let allComment = await commentModel.find({ chapterID: chapter.id }).populate('userID').sort({ reactionn: 'asc' })
        let comment = await commentModel.find({ chapterID: chapter.id }).populate('userID').sort({ reactionn: 'asc' }).skip(1 * (req.query.page - 1))
            .limit(10);
        // console.log(comment);
        let total = Math.ceil((allComment.length + 1) / (comment.length + 1))
        if (chapter) {
            res.render('pages/Home/read/comment', { comment, total })
        } else {
            res.json('khong co user ton tai')
        }
    } catch (e) {
        console.log({ message: 'Error getting pagination user' });
    }
}

module.exports.search = async (req, res) => {
    try {
        let manga = await MangaModel.find({ slug: { $regex: req.query.name, $options: 'i' } }).populate('author');
        console.log(421, manga);
        res.render('components/headerHome/search', { manga })
    } catch (e) {
        console.log(422, e);
    }
}

module.exports.updateManga = async (req, res) => {
    try {
        let manga = await MangaModel.findOne({ _id: req.body.id });
        // console.log(39, req.body.id, manga);
        if (manga) {
            let reaction = manga.like
            // console.log(reaction);
            // console.log(443, req.user._id);
            let liked = []
            if (reaction.length) {
                liked = reaction.filter((reaction) => {
                    return reaction !== req.user.id
                })
                if (reaction.length != liked.length) {
                    reaction = liked
                } else {
                    reaction.push(req.user.id);
                }
            } else {
                reaction.push(req.user.id);
                console.log(453, req.user.id);
            }
            // console.log(60, reaction);
            let updateManga = await MangaModel.findOneAndUpdate({ _id: manga._id }, { like: reaction });
            res.json({
                status: 200,
                message: 'like manga successfully'
            })
        } else {
            console.log('manga not found');
        }
    } catch (err) {
        res.json(err)
    }
}

module.exports.preview = async (req, res) => {
    try {
        const cookie = req.cookies;
        let manga = await MangaModel.find()
        let category = await CategoryModel.find().sort({ name: 'asc' })
        let user = await UserModel.find().sort({ buyed: 'desc' }).limit(10)
        let mangaDetail = await MangaModel.findOne({ slug: req.params.slug })
        let chapter = await ChapterModel.findOne({ mangaID: mangaDetail.id })
        let userDetails
        if (cookie) {
            userDetails = await UserModel.findOne({ token: cookie.user })
        }
        let buyed = mangaDetail.buyed
        let checked = false
        if (userDetails) {
            let userID = buyed.filter((id) => {
                return id === userDetails.id
            })
            if (userID[0] === userDetails.id) {
                console.log(319, userID);
                checked = true
            }
        }
        console.log(chapter);
        res.render('pages/Home/review/review', { manga, category, user, chapter, mangaDetail, checked })
    } catch (err) {
        console.log(err);
    }
}




// search by author name
// module.exports.viewByAuthorName = async (req, res) => {
//     try {
//         console.log('a');
//         let listAuthor = await UserModel.findOne({ username: req.params.name });
//         console.log(listAuthor);
//         let allManga = await ReviewMangaModel.find({ author: listAuthor.id })
//         res.render('pages/admin/viewMangaAuthorPost/viewMangaAuthorPostEjs/viewpaginationMangaAuthorPost.ejs', { allManga, listAuthor })
//     } catch (err) {
//         console.log(err);
//     }
// }
