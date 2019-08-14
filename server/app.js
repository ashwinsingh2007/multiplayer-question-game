var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cors = require("cors");

var app = express();

app.use(cors());
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:3001",
];
app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin. Hint: I said to add cors, you didn't listen";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send({ error: "Not found" });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).send({ error: err });
});

module.exports = app;
