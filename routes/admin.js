var AdminController = require('../controllers/admin');
module.exports = function (app,passport){
  app.get('/Administration', IsAdminLoggedIn, AdminController.index);
  app.get('/Administration/Auth', AdminController.Auth);
  app.post('/Administration/Auth',function (req, res, next) {
    passport.authenticate('local-signin', function (err, user, info) {
        console.log(info);
        
    })(req, res, next);
});
  function IsAdminLoggedIn(req,res,next){
    if(req.IsAdmin)
    return next();
    res.redirect('/Administration/Auth');
  }
}