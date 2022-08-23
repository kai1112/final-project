const mongoose = require("./dbConnection");
// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/ExpressDemo");
const ReviewMangaSchema = mongoose.Schema(
  {
    avatar: String,
    category: [String],
    name: String,
    author: String,
    description: String,
    views: Number,
    like: Number,
    price: Number,   
    stautus: {type: String, enum: ['posted', 'review'], default: 'review'},
  },
  { collection: "ReviewManga", timestamps: true }
);

const ReviewMangaModel = mongoose.model("ReviewManga", ReviewMangaSchema);

module.exports = ReviewMangaModel;
