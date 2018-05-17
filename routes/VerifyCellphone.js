const CellphoneVerifyEntry = require(_base + '/models/CellphoneVerifyEntry'),
    User = require(_base + '/models/User'),
    boiler = require(_base + '/middleware/Boiler');

const NAME = 'Verify Cellphone';

module.exports = {
    '/api/verify-cellphone/:id': {
        methods: ['post'],
        middleware: [boiler.requireFields(['id']), boiler.makeAlphaNumerics(['id']), boiler.handleErrors],
        fn: function(req, res, next) {
            let verifyEntryId = req.params.id;
            CellphoneVerifyEntry.findById(verifyEntryId, function(err, entry) {
                if(err) {
                    return res.sendBaseResponse(NAME, err);
                }
                if(entry && entry.user) { // Will there ever be a situation where the user in a given entry is not defined?
                    entry.user.cellPhoneVerified = true;
                    entry.user.save(function(err, updatedUser) {
                        res.sendBaseResponse(NAME, null, 'Verified cellphone');
                    });
                }
            });
        }
    }
}