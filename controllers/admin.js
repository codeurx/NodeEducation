var exports = module.exports = {}
var models  = require('../models');
var passport = require('passport')
require('../config/passport')(passport,models.admin);
exports.index = (req, res, next) => {
    models.Admin.findAll().then(function(admins) {
        res.render('admin/index', {
          title: 'Home Page',
          admins: admins
        });
      });
}
exports.SignUp = (req, res, next) => {
  res.render('admin/signup');
}
exports.Auth = (req, res, next) => {
  res.render('admin/auth');
}
exports.PostAuth = (req,res,next)=>{
  passport.authenticate('local-signin',  { successRedirect: '/Administration/',failureRedirect: '/Administration/Auth'});
}