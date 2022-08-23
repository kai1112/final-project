const mongoose = require("./dbConnection");
// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/ExpressDemo");
const MangaSchema = mongoose.Schema(
  {
    avatar: String,
    category: [String],
    name: String,
    author: {
      type: String,
      ref: 'User'
    },
    description: String,
    views: Number,
    like: Number,
    price: Number,
    reviewManga: {
      type: String,
      ref: 'ReviewManga'
    }
  },
  { collection: "Manga", timestamps: true }
);

const MangaModel = mongoose.model("Manga", MangaSchema);

module.exports = MangaModel;
