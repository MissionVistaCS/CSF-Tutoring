const auth = require(_base + 'middleware/Authentication'),
    boiler = require(_base + 'middleware/Boiler'),
    TutorRequestEntry = require(_base + 'models/TutorRequestEntry');

const NAME = 'Unassign Tutor';

module.exports = {
    '/api/unassign-tutor': {
        methods: ['post'],
        middleware: [auth.ensureAdmin, boiler.requireFields(['id'], boiler.makeAlphaSpecials(['id']))],
        fn: function(req, res, next) {
            let id = req.body.id;
            TutorRequestEntry.findById(id, function(err, entryF) {
                if(err) {
                    return res.sendBaseResponse(NAME, err);
                }
                if(entryF) {
                    entryF.tutor = null;
                    entryF.state = 'MANUAL';
                    entryF.notifications = [];
                    entryF.pairingAcceptance = null;
                    entryF.save(function(err, updatedEntry) {
                        if(err) {
                            return res.sendBaseResponse(NAME, err);
                        }
                        res.sendBaseResponse(NAME, null, 'Unassigned tutor.');
                    });
                }
            });
        }
    }
}