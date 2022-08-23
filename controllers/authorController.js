const UserModel = require('../models/user.model')
const fs = require("fs");
const bcrypt = require('bcrypt');

//view profile
module.exports.viewProfile = async (req, res) => {
  try {
    // khai bao bien cookies
    const cookies = req.cookies;
    const user = await UserModel.findOne({ token: cookies.user })
    if (user) {
      res.render('pages/author/profileAuthor/profileAuthor', { user })
    } else {
      console.log('user chuwa dang nhap');
    }
  } catch (err) {
    console.log(err);
  }
}
// change profile
module.exports.changeProfile = async (req, res) => {
  try {
    let userID = req.params.id;
    let user = await UserModel.findOne({ _id: req.params.id })
    console.log(26, user.avatar);
    if (user) {
      let user = await UserModel.updateOne({ _id: userID },
        req.body
      )
      fs.unlinkSync(user.avatar.slice(1))
      console.log('Success');
      res.json({
        status: 200,
        message: 'Success',
        err: false,
      })
    } else {
      res.status(400).json({
        message: 'user not found',
      })

    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}
//view create author page
module.exports.viewCreateAuthor = async (req, res) => {
  try {
    res.render('pages/admin/createAuthor/createAuthor')
  } catch (err) {
    console.log(err);
  }
}
// create account
module.exports.createAuthor = async (req, res) => {
  try {
    let author = await UserModel.findOne({ email: req.body.email })
    let role = 'author'
    console.log(role);
    if (author && author.role === 'user') {
      const password = await bcrypt.hash(req.body.password, 10)
      let data = await UserModel.create({
        username: req.body.username,
        email: req.body.email,
        password: password,
        role: role
      })
    } else if (!author) {
      const password = await bcrypt.hash(req.body.password, 10)
      let data = await UserModel.create({
        username: req.body.username,
        email: req.body.email,
        password: password,
        role: role
      })
      res.json({
        status: 200
      })
    } else {
      res.json('author da ton tai')
    }
  } catch (err) {
    console.log(err);
  }
}

// get  all author
module.exports.getAllAuthor = async (req, res) => {
  try {
    let allAuthor = await UserModel.find({ role: 'author' })
    // console.log(allUser)
    let listAuthor = await UserModel.find({ role: 'author' }).limit(10);
    let total = allAuthor.length;
    if (allAuthor) {
      res.render('pages/admin/manageAuthor/viewAllAuthorEjs/viewAllAuthor', { allAuthor, listAuthor, total: Math.ceil(total / 10) })
    } else {
      allAuthor = {}
      listAuthor = {}
      res.render('pages/admin/manageUser/viewAllUser/viewAllUserEjs/viewAllUser', { allAuthor, listAuthor })
    }
  } catch (err) {
    console.log(err);
  }
}

// phaan trang author
module.exports.getPaginationAuthor = async (req, res) => {
  try {
    let allAuthor = await UserModel.find({ role: 'author' }).skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);
    if (allAuthor) {
      res.render('pages/admin/manageUser/viewAllUser/viewAllUserEjs/viewAllUser', { allAuthor })
    } else {
      res.json('khong co user ton tai')
    }
  } catch (e) {
    console.log({ message: 'Error getting pagination user' });
  }

}

// ban user
module.exports.banAuthor = async (req, res) => {
  let status = ''
  try {
    // console.log(allUser)
    let user = await UserModel.findOne({ _id: req.body.id })
    console.log(90, user.status === 'active');
    if (user.status === 'active') {
      status = 'banned'
    } else {
      status = 'active'
    }

    if (!user) {
      res.json('author khong ton tai')
    } else {
      await UserModel.findOneAndUpdate({ _id: req.body.id }, { status: status })
    }
    res.json({
      status: 200,
      message: 'Successfully'
    })
  } catch (e) {
    res.json({ message: 'Error ban user' });
  }
}

// tang diem cho  author
module.exports.giftPointAuthor = async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.body.id });
    console.log(115, user);
    // console.log(116, req.body.money);
    let money = 0;
    money = Number(req.body.money) + user.monney
    // console.log(117, money);
    if (user) {
      // await UserModel.findOneAndUpdate({ _id: req.body.id }, { monney: money });
      await UserModel.findOneAndUpdate({ _id: req.body.id }, { monney: money });
    } else {
      res.json({ message: "User not found" })
    }
    res.json({ status: 200, message: 'success' })

  } catch (e) {
    res.json({ message: 'Error tang diem cho user' });
  }
}