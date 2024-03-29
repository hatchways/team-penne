const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const scraperRouter = require("./routes/scraper");
const userRouter = require("./routes/userController");
const pingRouter = require("./routes/ping");
const itemListRouter = require("./routes/itemList");
const followerRouter = require("./routes/followers");

const { json, urlencoded } = express;

var app = express();


app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.set("trust proxy", 1); // trust first proxy

app.use("/", userRouter);
app.use("/item-lists", itemListRouter);
app.use("/followers", followerRouter);
app.use("/ping", pingRouter);
app.use("/api", scraperRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
