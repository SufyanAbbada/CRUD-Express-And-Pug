var express = require("express");
const ProductModel = require("../models/ProductModel");
const { options } = require("./products");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/cart/:id", async function (req, res, next) {
  let prodadd = await ProductModel.findById(req.params.id);
  //console.log(prodadd);
  //Here we have defined a cart variable in which we will store the values of Cookies in it
  let cart = [];
  //So if the data of cookies is present, we simply load it in our cart variable.
  if (req.cookies.cart) {
    cart = req.cookies.cart;
    //This if statement is simply saying that if there lie a variable of Cookies in the browser's cookie part
    //then add that value in the cart variable of ours.
  }
  //And if there is not, we simply will add the coming item to store in the cookies where previous value is stored.
  cart.push(prodadd);
  //Now we send the response with that cart value to the browser
  //And this will let us save that item
  res.cookie("cart", cart);
  //console.log("Cart is " + cart);
  //This cart is double quotes mean that browser will store our cart variables value in cart variable in cookies too
  res.redirect("/products");
});

//Now lets remove some data from the cart so it can filter out and let it goo.
//So now we simply will remove that cookie from the browser.

router.get("/cart/remove/:id", async function (req, res, next) {
  //Here we have the 'id' of the cookie and thus we use it to remove from the cart array.
  let cart = [];
  if (req.cookies.cart) {
    cart = req.cookies.cart;
  }
  //cart.push(prodadd);
  //So rather than pushing in the array, we cut it out
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id), //This will find the Index of the element whose id is here.
    1
  );
  res.cookie("cart", cart);
  //console.log("Cart is " + cart);
  res.redirect("/cart");
});

router.get("/cart", function (req, res, next) {
  //Now as our Customer comes to the My Cart options, we should not get this from the Database but from the cookies.
  let cartitems = req.cookies.cart;
  //Means that the cookies will come and we store it in the cartitems
  //But lets check it
  if (!cartitems) cartitems = [];
  //If there is nothing in the cookies or there is no variable named cookies, we will initialize it with nothing.

  //Now we will send our cart class with those cookies so that we can use them to show our data.

  res.render("scart", { cartitems });
});

module.exports = router;
