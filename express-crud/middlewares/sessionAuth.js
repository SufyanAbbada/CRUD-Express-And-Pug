function sessionAuth(req, res, next) {
  res.locals.user = req.session.user;
  //this simple function is doing nothing but simply taking the value from the session and saving in the local variables of 'user'.
  next();
}

module.exports = sessionAuth;