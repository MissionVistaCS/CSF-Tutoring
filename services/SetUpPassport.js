var passport = require("passport");

var LocalStrategy = require("passport-local").Strategy;

var User = require(_base + "models/User");

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (username, password, done) {
    User.findOne({email: username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false,
                {message: "Invalid email or password."});
        }
        user.checkPassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false,
                    {message: "Invalid email or password."});
            }
        });
    });
}));
