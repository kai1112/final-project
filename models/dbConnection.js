// const mongoose = require('mongoose');
// const mongooseDBLinkk = process.env.mongodblink
// mongoose.createConnection(mongooseDBLinkk)
const mongoose = require('mongoose');
mongoose.connect(process.env.mongodblink);

module.exports = mongoose;