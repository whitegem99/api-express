var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
var route = require('./route');
var app = express();
const { resCode } = require("./util")
global.resCode = resCode

const cors = require('cors');
require('dotenv').config();

var mongoose = require('mongoose')
const seeders = require('./seeder')

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    await seeders()
    console.log('Database successfully connected!');
  },
    error => {
      console.log('Database could not connected', error);
    });


Array.prototype.paginate = function (page = 1, limit = 10) {
  return this.filter((item, index) => index < limit * page && index >= limit * (page - 1));
}

// global.resultArr = resultArr
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "3mb", extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use('/', route);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  throw err;
});

module.exports = app;
