const mongoose = require('./dbConnection');

const CategorySchema = mongoose.Schema({
    name: String,
    description: String,
}, { collection: "category", timestamps: true });
const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;