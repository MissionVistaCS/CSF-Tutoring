const boiler = require(_base + 'middleware/Boiler'),
    auth = require(_base + 'middleware/Authentication'),
    TutorRequestEntry = require(_base + 'models/TutorRequestEntry'),
    PairTutor = require(_base + 'services/PairTutor');

const NAME = 'New pair';

/**
 * Notifies a tutor associated with the given tutoring request entry
 */
module.exports = {
    '/api/new-pair': {
        methods: ['post'],
        middleware: [auth.ensureAdmin, boiler.requireFields(['request']), boiler.makeAlphaSpecials(['request']), boiler.handleErrors],
        fn: function (req, res, next) {
            const id = req.body.request;

            TutorRequestEntry.findOne({_id: id}).populate('tutor').exec(function (err, entry) {
                if (err) {
                    return res.sendBaseResponse(NAME, new UserError('Mongoose error w/ querying user: duplicate key, invalid field types, etc.'));
                }

                if (!entry) {
                    return res.sendBaseResponse(NAME, new UserError('No entry found with that id'));
                }

                PairTutor.pairRequestWithTutor(entry._id);
                res.sendBaseResponse(NAME, null, 'Attempting to find new pair for entry.');
            });
        }
    }
};
