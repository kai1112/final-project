const UserModel = require('../models/user.model')
const fs = require("fs");

//view profile
module.exports.viewProfile = async (req, res) => {
    try{
        // khai bao bien cookies
        const cookies = req.cookies;
        const user = await UserModel.findOne({token: cookies.user})
        if(user){
            res.render('pages/admin/profileAdmin/profileAdmin', {user})
        }else{
            console.log('user chuwa dang nhap');
        }
    }catch(err){
        console.log(err);
    }
}
// change profile
module.exports.changeProfile = async (req, res) => {
    try{
      let userID = req.params.id;
      let user = await UserModel.findOne({_id: req.params.id})
      console.log(26, user.avatar);
      if(user){
        let user = await UserModel.updateOne({_id: userID},
            req.body
        )
        fs.unlinkSync(user.avatar.slice(1))
        console.log('Success');
        res.json({
          status: 200,
          message: 'Success',
          err: false,
        })
      }else{
        res.status(400).json({
          message: 'user not found',
        })
        
      }
    }catch (err) {
      console.log(err);
      res.json(err);
    }
}
