const permissions = require(_base + 'services/Permissions');

module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.sendBaseResponse('', new PermissionError(_strings.get('errors.unauthorized')));
        }
    },

    /**
     * Ensures that a session has a permission
     *
     * @param perm
     * @param offline       If true, route is allowed when offline
     * @returns {Function}
     */
    ensurePerm: function (perm) {
        return function (req, res, next) {
            permissions.hasPermission(req.user ? req.user._id : null, perm, function (err, hasPerm) {
                if (hasPerm) {
                    next();
                } else {
                    res.sendBaseResponse('', new PermissionError('User tried to use resource: ' + JSON.stringify(perm)));
                }
            });
        };
    }
};