const validate = require(_base + 'services/ValidateReq');

/**
 * Put boilerplate middleware in here.
 * @type {Object}
 */
module.exports = {
    /**
     * Returns a method that checks for required fields during GET request.
     * @param  {Array} req  Required fields
     * @return {Function}   Middleware function for requests
     */
    requireGetFields: function (requires) {
        return (function (req, res, next) {
            var missing = [];

            for (var i = 0; i < requires.length; i++) {
                if (!req.query.hasOwnProperty(requires[i]) || !req.query[requires[i]]) {
                    missing.push(requires[i]);
                }
            }

            if (missing.length > 0) {
                return next(new Error(_strings.get('errors.missing').format(missing.join(', '))));
            }

            next();
        });
    },

    /**
     * Returns a method that checks for required fields during POST request.
     * @param  {Array} req  Required fields
     * @return {Function}   Middleware function for requests
     */
    requirePostFields: function (requires) {
        return (function (req, res, next) {
            var missing = [];

            for (var i = 0; i < requires.length; i++) {
                if (!req.body.hasOwnProperty(requires[i]) || !req.body[requires[i]]) {
                    missing.push(requires[i]);
                }
            }

            if (missing.length > 0) {
                return next(new Error(_strings.get('errors.missing').format(missing.join(', '))));
            }

            next();
        });
    },

    requireFields: function (requires) {
        return function (req, res, next) {
            validate.setRequest(req);
            requires.forEach(function (require) {
                validate.exists(require);
            });
            next();
        }
    },

    makeInts: function (ints) {
        return function (req, res, next) {
            validate.setRequest(req);
            ints.forEach(function (int) {
                validate.makeInt(int);
            });
            next();
        }
    },

    makeBooleans: function (ints) {
        return function (req, res, next) {
            validate.setRequest(req);
            ints.forEach(function (int) {
                validate.makeBoolean(int);
            });
            next();
        }
    },

    makeAlphas: function (ints) {
        return function (req, res, next) {
            validate.setRequest(req);
            ints.forEach(function (int) {
                validate.makeAlpha(int);
            });
            next();
        }
    },

    makeAlphaNumerics: function (ints) {
        return function (req, res, next) {
            validate.setRequest(req);
            ints.forEach(function (int) {
                validate.makeAlphaNumeric(int);
            });
            next();
        }
    },

    makeAlphaSpecials: function (ints) {
        return function (req, res, next) {
            validate.setRequest(req);
            ints.forEach(function (int) {
                validate.makeAlphaSpecial(int);
            });
            next();
        }
    },

    makeEmails: function (ints) {
        return function (req, res, next) {
            validate.setRequest(req);
            ints.forEach(function (int) {
                validate.makeEmail(int);
            });
            next();
        }
    },

    makePhoneNums: function (ints) {
        return function (req, res, next) {
            validate.setRequest(req);
            ints.forEach(function (int) {
                validate.makePhoneNum(int);
            });
            next();
        }
    },

    makeAlphaWithSpaces: function (ints) {
        return function (req, res, next) {
            validate.setRequest(req);
            ints.forEach(function (int) {
                validate.makeAlphaWithSpace(int);
            });
            next();
        }
    },

    makeJsons: function (ints) {
        return function (req, res, next) {
            validate.setRequest(req);
            ints.forEach(function (int) {
                validate.makeJson(int);
            });
            next();
        }
    },

    handleErrors: function (req, res, next) {
        validate.handleError(function (baseRes) {
            if (baseRes) return res.sendBaseResponse(baseRes);
            next();
        });
    }
};