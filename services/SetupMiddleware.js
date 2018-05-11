const cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require("express-session"),
    expressValidator = require('express-validator'),
    validator = require('validator');
passport = require('passport');

const specials = ['-', '_'];

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(expressValidator({
        customValidators: {
            isAlphanumericSpecial: function (value) {
                if (value) {
                    specials.forEach(function (spec) {
                        value = value.replaceAll(spec, '');
                    });
                    return validator.isAlphanumeric(value);
                }

                return false;
            },

            isAlphaWithSpace: function (value) {
                if (value) {
                    return validator.isAlpha(value.replaceAll(' ', ''));
                }

                return false;
            }
        }
    }));
    app.use(cookieParser());
    app.use(session({
        secret: _keys.get('auth.secret'),
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false, maxAge: Number(_keys.get('auth.cookieAge'))}
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};