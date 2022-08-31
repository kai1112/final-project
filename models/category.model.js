const mongoose = require('./dbConnection');
// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/ExpressDemo");

const CategorySchema = mongoose.Schema({
    name: String
}, { collection: "category", timestamps: true });
const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;