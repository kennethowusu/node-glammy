var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');

//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var account = require('./routes/account');
var basket = require('./routes/basket');


//middle wares
const basketMiddleware = require('./middleware/basketMiddleware');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//dotenv
require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//get returning Url after signin or signup
app.use(function(req,res,next){
  res.locals.returnUrl = req.originalUrl;
  next();
})


//user defined middleware
app.use(basketMiddleware.createBasketCookie);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/account',account);
app.use('/basket',basket);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
