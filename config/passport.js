//load bcrypt
var bCrypt = require('bcrypt-nodejs');
module.exports = function (passport, user) {
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
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({ where: { email: email } }).then(function (user) {
                if (user) {
                    return done(null, false, { message: 'That email is already taken' });
                } else {
                    var userPassword = generateHash(password);
                    var data = {
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
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
    //USER LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true },
        function (req, email, password, done) {
            console.log('hi')
            var User = user;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            console.log(email,password)
            User.findOne({ where: { email: email } }).then(function (user) {
                if (!user) {
                    res.set('Content-Type', 'application/json');
                    res.send('not found')
                    res.end()
                }
                if (!isValidPassword(user.password, password)) {
                    res.set('Content-Type', 'application/json');
                    res.send('password error')
                    res.end()
                }
                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function (err) {
                res.set('Content-Type', 'application/json');
                res.send(err)
                res.end()
            });
        }
    ));
}