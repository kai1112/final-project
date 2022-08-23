// const mongoose = require('mongoose');
// const mongooseDBLinkk = process.env.mongodblink
// mongoose.connect(mongooseDBLinkk)
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/final-project');

module.exports = mongoose;