const mongoose = require("./dbConnection");
// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/ExpressDemo");
const ReactionSchema = mongoose.Schema(
  {
    count: Number,
    userID: {
      type: String,
      ref: "User",required: true
    },
    commentID: {
      type: String,
      ref: "Comment",required: true
    },
  },
  { collection: "Reaction", timestamps: true }
);

const ReactionModel = mongoose.model("Reaction", ReactionSchema);

module.exports = ReactionModel;
