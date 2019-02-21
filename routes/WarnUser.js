const boiler = require(_base + 'middleware/Boiler'),
    auth = require(_base + 'middleware/Authentication'),
    User = require(_base + 'models/User');

const NAME = 'Warn User';

module.exports = {
    '/api/warn-user': {
        methods: ['post'],
        middleware: [auth.ensureAdmin, boiler.requireFields(['id']), boiler.makeAlphaSpecials(['id']), boiler.handleErrors],
        fn: function (req, res, next) {
            const id = req.body.id;

            User.findOne({_id: id}, function (err, user) {
                if (err) {
                    return res.sendBaseResponse(NAME, new UserError('Mongoose error w/ querying user: duplicate key, invalid field types, etc.'));
                }

                if (!user) {
                    return res.sendBaseResponse(NAME, new UserError('No user found with that id'));
                }

                user.warnings++;

                user.save(function (err) {
                    if (err) {
                        return res.sendBaseResponse(NAME, new UserError('Mongoose error w/ saving user: duplicate key, invalid field types, etc.'));
                    }

                    res.sendBaseResponse(NAME, null, "Warned user.");
                });
            });
        }
    }

};
