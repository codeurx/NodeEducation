var exports = module.exports = {}
var models  = require('../models');
var passport = require('passport');
exports.index = (req, res, next) => {
    models.Admin.findAll().then(function(admins) {
        res.render('admin/index', {
          title: 'Home Page',
          admins: admins
        });
      });
}
exports.Auth = (req, res, next) => {
  require('../config/passport')(passport,models.admin);
  res.render('admin/auth',{error:false,message:''});
}
exports.PostAuth = (req,res,next)=>{
  passport.authenticate('local-signin',  { successRedirect: '/Administration/',failureRedirect: '/Administration/Auth'});
}