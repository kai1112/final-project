const mongoose = require("./dbConnection");
// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/ExpressDemo");

const UserSchema = mongoose.Schema(
  {
    avatar: String,
    username: String,
    password: String,
    discription: String,
    dateOfBirth: Date,
    token: String,
    email: String,
    monney: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'banned'], default: 'active' },
    role: { type: String, enum: ['user', 'admin', 'author'], default: 'user' },
    buyed: [{}],
    avatar: { type: String, default: 'public/static/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg' }
  },
  { collection: "User", timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
