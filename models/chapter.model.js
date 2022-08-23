const mongoose = require('./dbConnection');
// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/ExpressDemo");
const ChapterSchema = mongoose.Schema({
    chap: Number,
    title: String,
    content: String,
    views: Number,
    mangaID: {
        type: String,
        ref: "Manga",required: true
      }
}, { collection: "Chapter", timestamps: true });
const ChapterModel = mongoose.model("Chapter", ChapterSchema);

module.exports = ChapterModel;