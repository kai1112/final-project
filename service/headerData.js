const UserModel = require('../models/user.model')
const CategoryModel = require('../models/category.model');


async function header(req, res) {
    try {
        const cookie = req.cookies;
        let userDetail = await UserModel.findOne({ token: cookie.user })
        let category = await CategoryModel.find().sort({ name: 'asc' })
        let user = await UserModel.find().sort({ buyed: 'desc' }).limit(10)
        return {
            userDetail, category, user, cookie
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { header }