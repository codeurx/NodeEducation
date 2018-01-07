var AdminController = require('../controllers/admin');
module.exports = function (app, passport) {
  app.get('/Administration/Logout', function (req, res) {
    req.logout();
    res.redirect('/Administration/Auth');
  });
  app.get('/Administration', IsAdminLoggedIn, AdminController.index);
  app.get('/Administration/Signup', AdminController.SignUp);
  app.post('/Administration/Signup', passport.authenticate('local-signup', { successRedirect: '/dashboard', failureRedirect: '/signup' }));
  app.get('/Administration/Auth', RedirectIfAuth, AdminController.Auth);
  app.post('/Administration/Auth', AdminController.PostAuth);
  function RedirectIfAuth(req, res, next) {
    if (req.isAuthenticated() && req.user.role == 'admin') {
      res.redirect('/Administration/');
    } else {
      return next();
    }
  }
  function IsAdminLoggedIn(req, res, next) {
    if (req.isAuthenticated() && req.user.role == 'admin') {
      return next();
    } else {
      res.redirect('/Administration/Auth');
    }
  }
}