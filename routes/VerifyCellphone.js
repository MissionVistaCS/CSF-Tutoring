const CellphoneVerifyEntry = require(_base + '/models/CellphoneVerifyEntry'),
    User = require(_base + '/models/User'),const CellphoneVerifyEntry = require(_base + '/models/CellphoneVerifyEntry'),
    User = require(_base + '/models/User'),
    boiler = require(_base + '/middleware/Boiler');

const NAME = 'Verify Cellphone';

module.exports = {
    '/api/verify-cellphone/:id': {
        methods: ['get'],
        middleware: [boiler.requireFields(['id']), boiler.makeAlphaSpecials(['id']), boiler.handleErrors],
        fn: function (req, res, next) {
            let verifyEntryId = req.params.id;
            CellphoneVerifyEntry.findById(verifyEntryId).populate('user').exec(function (err, entry) {
                if (err) {
                    return res.sendBaseResponse(NAME, err);
                }
                if (entry && entry.user) {
                    entry.user.cellPhoneVerified = true;
                    entry.user.save(function (err, updatedUser) {
                        res.sendBaseResponse(NAME, null, 'Verified cellphone');
                    });
                } else
                return res.sendBaseResponse(NAME, new UserError('Did not find CellPhoneVerifyEntry with that id in the database.'));
            });
        }
    }
};