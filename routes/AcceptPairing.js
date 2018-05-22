const boiler = require(_base + 'middleware/Boiler'),
    TutorRequestEntry = require(_base + 'models/TutorRequestEntry');

const NAME = 'Accept pairing';

module.exports = {
    '/api/accept-pairing/:request': {
        methods: ['get'],
        middleware: [boiler.requireFields(['request']), boiler.makeAlphaSpecials(['request']), boiler.handleErrors],
        fn: function (req, res, next) {
            const id = req.params.request;
            TutorRequestEntry.findOneAndUpdate({_id: id, state: 'UNACCEPTED'}, { state: 'ACCEPTED', pairingAcceptance: Date.now() }, function (err, entry) {
                if (err) {
                    return res.sendBaseResponse(NAME, new UserError('Mongoose error: duplicate key, invalid field types, etc.'));
                }

                if (!entry) {
                    return res.sendBaseResponse(NAME, new UserError('An unaccepted tutoring request entry with that ID was not found.'));
                }

                res.sendBaseResponse(NAME, null, 'Successfully approved pairing with id ' + entry._id);
            });
        }
    }

};
