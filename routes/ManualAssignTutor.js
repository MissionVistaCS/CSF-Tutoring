const boiler = require(_base + 'middleware/Boiler'),
    auth = require(_base + 'middleware/Authentication'),
    TutorRequestEntry = require(_base + 'models/TutorRequestEntry'),
    PairTutor = require(_base + 'services/PairTutor');

const NAME = 'Manual Pair';


module.exports = {
    '/api/manual-pair': {
        methods: ['post'],
        middleware: [auth.ensureAdmin, boiler.requireFields(['entry', 'user']), boiler.makeAlphaSpecials(['entry', 'user']), boiler.handleErrors],
        fn: function (req, res, next) {
            const entryID = req.body.entry;
            const userID = req.body.user;
            console.error(entryID + "   " + userID);

            TutorRequestEntry.findOne({_id: entryID}).populate('tutor').exec(function (err, entry) {
                if (err) {
                    return res.sendBaseResponse(NAME, err);
                }

                if (!entry) {
                    return res.sendBaseResponse(NAME, new UserError('No entry found with that id'));
                }
                PairTutor.manualPairRequestWithTutor(entry._id, userID);
                res.sendBaseResponse(NAME, null, 'Attempting to find new pair for entry.');
            });
        }
    }
};