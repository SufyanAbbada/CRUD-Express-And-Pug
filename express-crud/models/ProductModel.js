const mongoose = require("mongoose");

var ProductsSchema = mongoose.Schema({
  name: String,
  price: Number,
});

const ProductModel = mongoose.model("product", ProductsSchema);

module.exports = ProductModel;

//Now this Model is called to the Main page of our.
