const mongoose = require("./dbConnection");
// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/ExpressDemo");
const MangaSchema = mongoose.Schema(
  {
    avatar: String,
    category: [{}],
    name: String,
    author: {
      type: String,
      ref: 'User'
    },
    description: String,
    views: { type: Number, default: 0 },
    like: Number,
    price: { type: Number, default: 0 },
    reviewManga: {
      type: String,
      ref: 'ReviewManga'
    },
    buyed: [String],
    slug: String,
  },
  { collection: "Manga", timestamps: true }
);

const MangaModel = mongoose.model("Manga", MangaSchema);

module.exports = MangaModel;
