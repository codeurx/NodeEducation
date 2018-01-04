var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport   = require('passport');
var session    = require('express-session');
var admin = require('./routes/admin');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('admin/css', path.join(__dirname, 'public/admin/css'));
app.set('admin/js', path.join(__dirname, 'public/admin/js'));
app.set('admin/img', path.join(__dirname, 'public/admin/img'));
app.set('css', path.join(__dirname, 'public/css'));
app.set('js', path.join(__dirname, 'public/js'));
app.set('img', path.join(__dirname, 'public/img'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// For Passport
 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions
app.use(express.static(path.join(__dirname, 'public')));

//loading all routes
require('./routes/admin')(app,passport);
require('./routes/public')(app);
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;