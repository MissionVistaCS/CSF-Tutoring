const passport = require('passport');
const boiler = require(_base + 'middleware/Boiler');

const NAME = "Login";

module.exports = {
    '/api/login': {
        methods: ['post'],
        middleware: [boiler.requireFields(['email', 'password']), boiler.makeEmails(['email']), boiler.handleErrors, passport.authenticate("local", {
            successRedirect: "login/success",
            failureRedirect: "login/fail",
            failureFlash: false //Flash not needed
        })],
        fn: function (req, res, next) {

        }
    },
    '/api/login/success': {
        methods: ['get'],
        fn: function (req, res, next) {
            res.redirect('/api/session');
        }
    },
    '/api/login/fail': {
        methods: ['get'],
        fn: function (req, res, next) {
            res.sendBaseResponse(NAME, new UserError(_strings.get('errors.signin')));
        }
    }
};