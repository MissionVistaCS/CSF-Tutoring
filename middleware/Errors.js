module.exports = {
    notFound: function (req, res, next) {
        var err = new UserError('Page not found.');
        res.sendBaseResponse('Unknown page', err, "", 404);
    },

    /**
     * Errors not explicitly handled by us usually go here
     */
    handler: function (err, req, res, next) {
        console.critical(err);
        res.sendBaseResponse('An unknown error', new RuntimeError(err));
    }
};