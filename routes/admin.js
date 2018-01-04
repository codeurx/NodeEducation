var AdminController = require('../controllers/admin');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app,passport){
  app.get('/Administration', IsAdminLoggedIn, AdminController.index);
  app.get('/Administration/Auth', AdminController.Auth);
  app.post('/Administration/Auth', AdminController.PostAuth);
  function IsAdminLoggedIn(req,res,next){
    if(req.IsAdmin)
    return next();
    res.redirect('/Administration/Auth');
  }
}