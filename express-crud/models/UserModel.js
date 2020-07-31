const mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  name: String,
  mail: String,
  pass: String,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
