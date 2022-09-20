const mongoose = require("./dbConnection");
// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/ExpressDemo");
const CommentSchema = mongoose.Schema(
  {
    title: String,
    audio: String,
    mimeType: String,
    userID: {
      type: String,
      ref: "User",
    },
    chapterID: {
      type: String,
      ref: "Chapter",
    },
    mangaID: {
      type: String,
      ref: "Manga",
    },
    reaction: [String],
  },
  { collection: "Comment", timestamps: true }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
