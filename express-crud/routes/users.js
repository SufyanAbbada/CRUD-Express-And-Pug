var express = require("express");
var router = express.Router();
var UserModel = require("../models/UserModel");

/* GET users listing. */
//Here we show our users
router.get("/", async function (req, res, next) {
  //console.log(req.session.user);
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
    //Here we store the user in the session, so that it can be logged in as he/she arrives.
    req.session.user = usercheck;
    //This means that a variable named 'user' is saved which the user is now being logged in.
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

router.get("/logout", (req, res, next) => {
  //res.send("Will Log you out in just a bit.");
  //Here we will just make the variable to be null
  req.session.user = null;
  res.redirect("/users");
});

module.exports = router;
