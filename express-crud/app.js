var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var indexRouter = require("./routes/index");
var sessionAuth = require("./middlewares/sessionAuth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "dummytext",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 },
  })
);

app.use(sessionAuth);
//This Session Auth is doing nothing but is called on every route we apply on our site


app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose
  .connect("mongodb://localhost/Products", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB...."))
  .catch((error) => console.log(error.message));

module.exports = app;
