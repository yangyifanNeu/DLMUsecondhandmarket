var createError = require("http-errors");
const bodyParser = require("body-parser");
var express = require("express");
require("express-async-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const redis = require("redis");
const { REDIS_CONF } = require("./conf/db.js");
var session = require("express-session");
var RedisStore = require("connect-redis")(session);
const expressWs = require("express-ws");
var indexRouter = require("./controller/index");
var usersRouter = require("./controller/users");
var gridControler = require("./controller/grid");
var productController = require("./controller/product");
var categoryController = require("./controller/category");
var codelistController = require("./controller/codelist");
var tagController = require("./controller/tag");
  
var app = express();
expressWs(app);
var chartController = require("./controller/chart");
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({
  limit:'200mb'
}));
app.use(bodyParser.urlencoded({
  limit:'200mb',
  extended:true
}));
//设置允许跨域访问该服务.
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://192.168.0.110:8848");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Set-Cookie", ["SameSite=None", "Secure"]);
  next();
});
app.use(
  session({
    secret: "testproject",
    store: new RedisStore({
      client: redis.createClient(REDIS_CONF),
    }),
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6000000 },
  })
);
//controller
// 检查认证
app.all("*", function (req, res, next) {
  if (
    (!req.session || !req.session.user) &&
    req.url.indexOf("/user/") != 0 &&
    req.url.indexOf("/codelist/") != 0
    &&req.method !== "OPTIONS"

  ) {
    const err = new Error("You shall not pass" + req.url);
    err.statusCode = 403;
    next(err);
  } else {
    next();
  }
});
app.use("/user", usersRouter);
app.use("/", indexRouter);
app.use("/", gridControler);
app.use("/", chartController);
app.use("/category", categoryController);
app.use("/product", productController);
app.use("/codelist", codelistController);
app.use("/tag",tagController);

module.exports = app;
