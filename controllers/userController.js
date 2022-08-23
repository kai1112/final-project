const UserModel = require('../models/user.model')
const fs = require("fs");

//view profile
module.exports.viewProfile = async (req, res) => {
  try {
    // khai bao bien cookies
    const cookies = req.cookies;
    const user = await UserModel.findOne({ token: cookies.user })
    if (user) {
      res.render('pages/user/profileUser/profileUser', { user })
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
    // console.log(26, user.avatar);
    if (user) {
      let user = await UserModel.updateOne({ _id: userID },
        req.body
      )
      fs.unlinkSync(user.avatar.slice(1))
      console.log('Success');
      res.json({
        status: 200,
        message: 'Success',
      })
    } else {
      res.status(400).json({
        message: 'user not found',
      })

    }
  } catch (err) {
    console.log(err);
    // res.json(err);
  }
}

// get all users
module.exports.getAllUsers = async (req, res) => {
  try {
    let allUser = await UserModel.find({ role: 'user' });
    // console.log(allUser)
    let listUsers = await UserModel.find({ role: 'user' }).limit(1);
    let total = allUser.length;
    if (allUser) {
      res.render('pages/admin/manageUser/viewAllUser/viewAllUserEjs/viewAllUser', { listUsers, total: Math.ceil(total / 1) })
    } else {
      listUsers = {}
      res.render('pages/admin/manageUser/viewAllUser/viewAllUserEjs/viewAllUser', { listUsers })
    }
  } catch (e) {
    res.json({ message: 'khong co user' })
  }
}

// phaan trang user
module.exports.getPaginationUser = async (req, res) => {
  try {
    let listUsers = await UserModel.find({ role: 'user' }).skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);
    if (listUsers) {
      res.render('pages/admin/manageUser/viewAllUser/viewAllUserEjs/paginationUser', { listUsers })
    } else {
      res.json('khong co user ton tai')
    }
  } catch (e) {
    console.log({ message: 'Error getting pagination user' });
  }
}

// ban user
module.exports.banUser = async (req, res) => {
  let status = ''
  try {
    // console.log(allUser)
    let user = await UserModel.findOne({ _id: req.body.id })
    // console.log(90, user.status === 'active');
    if (user.status === 'active') {
      status = 'banned'
    } else {
      status = 'active'
    }

    if (!user) {
      res.json('user khong ton tai')
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


// tang diem cho  user
module.exports.giftPointUser = async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.body.id });
    // console.log(115, user);
    // console.log(116, req.body.money);
    let money = 0;
    money = Number(req.body.money) + user.monney
    // console.log(117, money);
    if (user) {
      await UserModel.findOneAndUpdate({ _id: req.body.id }, { monney: money });
    } else {
      res.json({ message: "User not found" })
    }
    // console.log(163);
    res.json({ status: 200, message: 'success' })

  } catch (e) {
    res.json({ message: 'Error tang diem cho user' });
  }
}

// find user by name
module.exports.getFindUserByNameUser = async (req, res) => {
  try {
    const listUsers = await UserModel.find({ username: { $regex: req.params.username } })
    let allUser = await UserModel.find();
    // console.log(allUser)
    let total = allUser.length;
    //   console.log(125, listUsers.length);
    if (listUsers.length > 0) {
      // console.log(127, listUsers);
      res.render('pages/admin/manageUser/viewAllUser/viewAllUserEjs/viewAllUser', { listUsers, total: Math.ceil(total / 10) })
    } else {
      let listUsers = []
      res.render('pages/admin/manageUser/viewAllUser/viewAllUserEjs/viewAllUser', { listUsers, total: Math.ceil(total / 10) })
    }
  } catch (e) {
    console.log(e);
  }
}