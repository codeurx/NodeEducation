
var bCrypt = require('bcrypt-nodejs');
module.exports = function (passport, user, role) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
    passport.use('local-signin', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true },
        function (req, email, password, done) {
            var User = user;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({ where: { email: email } }).then(function (user) {
                if (!user) {
                    return done(null, false, { message: 0 });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, { message: 0 });
                }
                var userinfo = user.get();
                return done(null, userinfo, { message: 'ok' });
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, { message: 'Something went wrong with your Signin' });
            });
        }
    ));
    passport.use('local-signup', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, function (req, email, password, done) {
        var generateHash = function (password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        User.findOne({ where: { email: email } }).then(function (user) {
            if (user) {
                return done(null, false, { message: 'That email is already taken' });
            } else {
                var userPassword = generateHash(password);
                var data =
                    {
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        role:role
                    };
                User.create(data).then(function (newUser, created) {
                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        return done(null, newUser);
                    }
                });
            }
        });
    }));
}