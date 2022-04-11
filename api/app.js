// This Loads the configuration dynamically from to the current enviroment
// Defaults to _dev_ if the environment was set
require("custom-env").env(true);
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const logger = require("./config/logger");
const mainPersistence = require("./persistence/mainPersistence");
const indexRouter = require("./routes/indexRoute");
const dronesRouter = require("./routes/dronesRoute");

const router = express.Router();
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");


app.use(morgan("combined", { stream: logger.stream }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
router.use("/drones", dronesRouter);
app.use("/api/v1", router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  logger().error(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
// DATABASE
mainPersistence.getDb();
console.log(`NODE_ENV=${process.env.NODE_ENV}`);
