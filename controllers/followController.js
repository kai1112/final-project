const Follow = require('../models/library.model')
const CategoryModel = require('../models/category.model')
module.exports.createFollow = async (req, res) => {
    try {
        if (req.user._id === null) {
            res.json({ message: 'ban chua dang nhap' })
        } else {
            let followed = await Follow.findOne({ userID: req.user._id, mangaID: req.body.id })
            if (followed) {
                let unFollow = await Follow.findOneAndDelete({ userID: req.user._id, mangaID: req.body.id })
                res.json({ status: 200, message: 'unFollow successfully' })
            } else {
                let createdfollow = await Follow.create({
                    status: 'Followed',
                    userID: req.user._id,
                    mangaID: req.body.id,
                })
                res.json({ status: 200, message: 'follow successfully' })
            }
        }
    } catch (err) {
        res.json(err)
    }
}

module.exports.unFollow = async (req, res) => {
    try {
        let follow = await Follow.findOne({ _id: req.body.id })
        if (follow) {
            let unFollow = await Follow.findOneAndDelete({ _id: req.body.id })
        } else {
            console.log('follow not found');
        }
        res.json({ status: 200 })
    } catch (err) {
        res.json(err)
    }
}

module.exports.viewAllFollows = async (req, res) => {
    try {
        let category = await CategoryModel.find().sort({ name: 'asc' })
        let follows = await Follow.find({ userID: req.user._id }).populate('mangaID')
        if (follows) {
            res.render('pages/Home/follow/follow', { follows, category })
            console.log(40, follows);
        } else {
            console.log(42, 'follows not found');
        }
    } catch (err) {
        console.log(err)
    }
}