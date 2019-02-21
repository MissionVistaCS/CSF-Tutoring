const passport = require("passport");

module.exports = {
    '/api/logout': {
        methods: ['post'],
        middleware: [],
        fn: function(req, res, next) {
            req.logout();
            req.session.destroy(function(err) {
                if (err) return res.sendBaseResponse("Logout", err);
                res.sendBaseResponse("Logout", null, "Success")
            });
        }
    }
};