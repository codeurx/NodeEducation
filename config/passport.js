
var bCrypt = require('bcrypt-nodejs');
module.exports = function (passport,user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
    //USER LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true },
        function (req, email, password, done) {
            var User = user;
            var isValidPassword = function (userpass, password) {
                return password == userpass;
            }
            User.findOne({ where: { email: email } }).then(function (user) {
                if (!user) {
                    return done(null, false, {message:'fuck'});
                }
                console.log(user.username)
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {message:'pass'});
                }
                var userinfo = user.get();
                console.log(userinfo)
                return done(null, {a:'qsd'});
            }).catch(function (err) {
                console.log("Error:",err);

      return done(null, false, { message: 'Something went wrong with your Signin' });
            });
        }
    ));
}