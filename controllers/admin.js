var exports = module.exports = {}
var models  = require('../models');
var passport = require('passport')
require('../config/passport')(passport,models.admin,'admin');
exports.index = (req, res, next) => {
  res.render('admin/index', {title: 'Administration',page_name:'home',admin:req.user});
}
exports.SignUp = (req, res, next) => {
  res.render('admin/signup');
}
exports.Auth = (req, res, next) => {
  res.render('admin/auth');
}
exports.PostAuth = (req,res,next)=>{
  passport.authenticate('local-signin', function (err, user, info) {
    if(info.message == 'ok'){
      req.logIn(user, function (err) {
        res.send('ok');
      });
    }else{
      res.send('verif');
    }
  })(req, res, next);
}