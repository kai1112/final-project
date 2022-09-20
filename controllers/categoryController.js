const CategoryModel = require('../models/category.model')
const Reviewmanga = require('../models/reviewManga')
const MangaModel = require('../models/manga.model')
const UserModel = require('../models/user.model')


module.exports.viewCreateCategory = async (req, res) => {
    try {
        res.render("pages/category/createCategory/createCategory")
    } catch (e) {
        console.log(e);
    }
}


module.exports.createCategory = async (req, res) => {
    try {
        let category = await CategoryModel.find({ name: req.body.category })
        // console.log(!category.length);
        if (category.length) {
            // console.log(20, req.body);
            console.log('name category da ton tai')
        } else {
            let newCategory = await CategoryModel.create({
                name: req.body.category,
                description: req.body.description
            })
            res.json({ status: 200 })
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports.editCategory = async (req, res) => {
    try {
        let category = await CategoryModel.findOne({ id: req.params.id })
        if (category) {
            let updateCategory = await CategoryModel.updateOne({ _id: category._id },
                { name: req.body.name, description: req.body.description }
            )
        } else {
            res.json('category khong ton tai')
        }
        res.json({ status: 200 })
    } catch (err) {
        res.json(err)
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        let category = await CategoryModel.findOne({ _id: req.params.id })
        let reviewmanga = await Reviewmanga.find()
        let manga = await MangaModel.findOne()
        if (category) {
            let categorydele = await CategoryModel.findOneAndDelete({ _id: category._id })
            for (let i = 0; i < reviewmanga.length; i++) {
                for (let j = 0; j < reviewmanga.category.length; j++) {
                    if (reviewmanga.category[j] === category._id) {
                        await Reviewmanga.findOneAndDelete({ _id: reviewmanga[i]._id })
                    }
                }
            }
            for (let i = 0; i < manga.length; i++) {
                for (let j = 0; j < manga.category.length; j++) {
                    if (manga.category[j] === category._id) {
                        await MangaModel.findOneAndDelete({ _id: manga[i]._id })
                    }
                }
            }
        } else {
            res.json('category not found')
        }
        res.json({ status: 200 })
    } catch (err) {
        res.json(err)
    }
}

module.exports.findMangaByCategory = async (req, res) => {
    try {
        console.log(req.params.id);
        let user = await UserModel.find().sort({ buyed: 'desc' }).limit(10)
        let category = await CategoryModel.find().sort({ name: 'asc' })
        let manga = await MangaModel.find({ 'category.id': req.params.id })
        res.render('pages/findByCategory/findByCategory', { manga, user, category })
        console.log(79, manga);
    } catch (err) {
        console.log(err);
    }
}