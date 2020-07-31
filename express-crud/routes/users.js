var express = require("express");
var router = express.Router();
var UserModel = require("../models/UserModel");

/* GET users listing. */
//Here we show our users
router.get("/", async function (req, res, next) {
  let usershow = await UserModel.find();
  res.render("./users/usersshow", { usershow });
});

//Here we are getting Signup
router.get("/sign", function (req, res, next) {
  res.render("./users/sign");
});

//Now lets log in to our users.
router.get("/signin", function (req, res, next) {
  res.render("./users/signin");
});

router.post("/signin", async function (req, res, next) {
  let usercheck = await UserModel.findOne({
    mail: req.body.mail,
    pass: req.body.pass,
  });
  if (!usercheck) {
    return res.redirect("/users/sign");
  } else {
    return res.redirect("/users");
  }
});

router.post("/sign", async (req, res, next) => {
  let newuser = new UserModel(req.body);
  await newuser.save();
  //res.send("Just Wait a minute");
  //console.log(req.body);
  res.redirect("/users");
});

module.exports = router;
