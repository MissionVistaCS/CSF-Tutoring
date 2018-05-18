let request = null;

module.exports = {

    setRequest: function (req) {
        request = req;
        return this;
    },

    exists: function (param) {
        request.assert(param, "Invalid " + param + ", cannot be empty.").notEmpty();
        return this;
    },

    makeInt: function (param) {
        if ((request.body[param] === null || request.body[param] === undefined) && (request.query[param] === null || request.query[param] === undefined) && (request.params[param] === null || request.params[param] === undefined)) {
            return this;
        }
        request.assert(param, "Invalid " + param + ", must be of type int.").isInt();
        request.sanitize(param).toInt();
        return this;
    },

    makeBoolean: function (param) {
        if ((request.body[param] === null || request.body[param] === undefined) && (request.query[param] === null || request.query[param] === undefined) && (request.params[param] === null || request.params[param] === undefined)) {
            return this;
        }
        request.assert(param, "Invalid " + param + ", must be of type boolean.").isBoolean();
        request.sanitize(param).isBoolean();
        return this;
    },

    makeAlpha: function (param) {
        if ((request.body[param] === null || request.body[param] === undefined) && (request.query[param] === null || request.query[param] === undefined) && (request.params[param] === null || request.params[param] === undefined)) {
            return this;
        }
        request.assert(param, "Invalid " + param + ", must consist of letters only.").isAlpha();
        return this;
    },

    makeAlphaNumeric: function (param) {
        if ((request.body[param] === null || request.body[param] === undefined) && (request.query[param] === null || request.query[param] === undefined) && (request.params[param] === null || request.params[param] === undefined)) {
            return this;
        }
        request.assert(param, "Invalid " + param + ", must be alphanumeric.").isAlphanumeric();
        return this;
    },

    makeAlphaSpecial: function (param) {
        if ((request.body[param] === null || request.body[param] === undefined) && (request.query[param] === null || request.query[param] === undefined) && (request.params[param] === null || request.params[param] === undefined)) {
            return this;
        }
        request.assert(param, "Invalid " + param + ", must be alphanumeric with dashes and/or underscores.").isAlphanumericSpecial();
        return this;
    },

    makeEmail: function (param) {
        if ((request.body[param] === null || request.body[param] === undefined) && (request.query[param] === null || request.query[param] === undefined) && (request.params[param] === null || request.params[param] === undefined)) {
            return this;
        }
        request.assert(param, "Invalid " + param + ", must be an email.").isEmail();
        return this;
    },

    makePhoneNum: function (param) {
        if ((request.body[param] === null || request.body[param] === undefined) && (request.query[param] === null || request.query[param] === undefined) && (request.params[param] === null || request.params[param] === undefined)) {
            return this;
        }
        request.assert(param, "Invalid " + param + ", must be a phone number.").matches(/^\\d{3}-\\d{3}-\\d{4}/);
        return this;
    },

    makeAlphaWithSpace: function (param) {
        if ((request.body[param] === null || request.body[param] === undefined) && (request.query[param] === null || request.query[param] === undefined) && (request.params[param] === null || request.params[param] === undefined)) {
            return this;
        }
        request.assert(param, "Invalid " + param + ", must be alpha with spaces.").isAlphaWithSpace();
        return this;
    },

    makeJson: function (param) {
        if ((request.body[param] === null || request.body[param] === undefined) && (request.query[param] === null || request.query[param] === undefined) && (request.params[param] === null || request.params[param] === undefined)) {
            return this;
        }
        request.assert(param, "Invalid " + param + ", must be of type JSON.").isJSON();
        if (request.body[param]) request.body[param] = JSON.parse(request.body[param]);
        if (request.query[param]) request.query[param] = JSON.parse(request.query[param]);
        if (request.params[param]) request.params[param] = JSON.parse(request.params[param]);
    },

    handleError: function (fn) {
        request.getValidationResult().then(function(result) {
            if (!result.isEmpty()) {
                let response = new BaseResponse('Incorrect parameters');
                result.array().forEach(function (error) {
                    response.addError(new UserError(error.msg));
                });
                return fn(response);
            }
            fn(null);
        });
    }
};