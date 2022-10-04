const mongoose = require('mongoose');
const mongooseDBLinkk = process.env.mongodblink
mongoose.connect(mongooseDBLinkk)
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/final-project');

module.exports = mongoose;