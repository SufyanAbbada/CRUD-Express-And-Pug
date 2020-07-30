var express = require("express");
var router = express.Router();
//Here we are requiring the Products Model because we want to show them here.
var ProductModel = require("../models/ProductModel");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let productsshow = await ProductModel.find();
  console.log(productsshow);
  //In order to send some variables to the view, we send them using curly braces while rendering that file.
  res.render("products/list", {
    title: "Products From database",
    data: productsshow,
  });
});

router.get("/add", async function (req, res, next) {
  res.render("products/add");
});
//Now simply by Getting, we also want to add any product in the data. So, we now simply will create Post Method also.
//However, this route will never render anything but
//Its Responsibility is to store the given and received data in Database.
router.post("/add", async function (req, res, next) {
  let newproadd = new ProductModel(req.body);
  await newproadd.save();
  //console.log(req.body);
  //Now we shall redirect it to the Products Page where now that new item will be shown.
  res.redirect("/products");
  //Well here we can redirect it on any page we want it to go and take action.
});

router.get("/delete/:index", async (req, res, next) => {
  console.log(req.params.index);
  await ProductModel.findByIdAndDelete(req.params.index);
  //console.log(req.body);
  res.redirect("/products");
});

//Now we are trying to edit the data of a specific document. So, now in order to do that,
//we simply will get that id and send it to a new page where we can use that to do changes
// So we will render a new page where we send that product lying on that ID. And from there we shall change it
router.get("/edit/:id", async (req, res, next) => {
  //console.log(req.params.id);
  let prod = await ProductModel.findById(req.params.id);
  //console.log(prod);
  res.render("products/edit", { prod });
  //Now lets go that page and make changes
});
//Here we have that request coming from the post method and we will obtain that changes in here.

router.post("/edit/:id", async (req, res, next) => {
  let editprod = await ProductModel.findById(req.params.id);
  editprod.name = req.body.name;
  editprod.price = req.body.price;
  await editprod.save();
  res.redirect("/products");
});

module.exports = router;
