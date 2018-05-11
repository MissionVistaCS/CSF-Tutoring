const permissions = require(_base + 'services/Permissions');

module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.sendBaseResponse('', new PermissionError(_strings.get('errors.unauthorized')));
        }
    },

    ensureAdmin: function (req, res, next) {
        if (!req.isAuthenticated() || !req.user.userGroup.includes('ADMIN')) {
            res.sendBaseResponse('', new PermissionError(_strings.get('errors.unauthorized')));
        } else {
            next();
        }
    },

    ensureGeneralTutor: function (req, res, next) {
        if (!req.isAuthenticated() || !(req.user.userGroup.includes('TUTOR') || req.user.userGroup.includes('PACK_TUTOR'))) {
            res.sendBaseResponse('', new PermissionError(_strings.get('errors.unauthorized')));
        } else {
            next();
        }
    },

    ensureTutor: function (req, res, next) {
        if (!req.isAuthenticated() || !req.user.userGroup.includes('TUTOR')) {
            res.sendBaseResponse('', new PermissionError(_strings.get('errors.unauthorized')));
        } else {
            next();
        }
    },

    ensurePackTutor: function (req, res, next) {
        if (!req.isAuthenticated() || !req.user.userGroup.includes('PACK_TUTOR')) {
            res.sendBaseResponse('', new PermissionError(_strings.get('errors.unauthorized')));
        } else {
            next();
        }
    }
};