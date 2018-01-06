var AdminController = require('../controllers/admin');
module.exports = function (app,passport){
  app.get('/Administration', IsAdminLoggedIn, AdminController.index);
  app.get('/Administration/Signup', AdminController.SignUp);
  app.post('/Administration/Signup', passport.authenticate('local-signup',  { successRedirect: '/dashboard',
  failureRedirect: '/signup'}
  ));
  app.get('/Administration/Auth', AdminController.Auth);
  app.post('/Administration/Auth',function (req, res, next) {
    passport.authenticate('local-signin', function (err, user, info) {
        if(info.message == 'ok'){
          res.redirect('/Administration/');
        }else{
          res.send('verif');
        }
    })(req, res, next);
});
  function IsAdminLoggedIn(req,res,next){
    if(req.isAuthenticated())
    return next();
    res.redirect('/Administration/Auth');
  }
}