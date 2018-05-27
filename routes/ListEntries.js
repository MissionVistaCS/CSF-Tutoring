const boiler = require(_base + 'middleware/Boiler');
const TutorRequestEntry = require(_base + 'models/TutorRequestEntry');

const NAME = 'List entries for a given tutor';

/**
 * Admins will get a list of entries assigned to a tutor as PENDING, UNACCEPTED, ACTIVE, INACTIVE.
 * Users will get a list of entires assigned to themselves as UNACCEPTED and ACTIVE
 */
module.exports = {
    '/api/list-entries': {
        methods: ['get'],
        middleware: [boiler.requireFields(['user']), boiler.makeAlphaSpecials(['user'])],
        fn: function (req, res, next) {
            let id = req.query.user;

            if (req.user && (req.user.userGroup.includes('ADMIN') || req.user._id === id)) {
                let isAdmin = req.user.userGroup.includes('ADMIN');

                let query = { state: { $in: isAdmin ? ['MANUAL', 'PENDING', 'UNACCEPTED', 'ACTIVE', 'INACTIVE'] : ['UNACCEPTED', 'ACTIVE'] } };
                if (id) {
                    query.tutor = id;
                }

                TutorRequestEntry.find(query).populate('tutor').exec(function (err, entries) {
                    if (err) {
                        return res.sendBaseResponse(NAME, err);
                    }

                    let purgedEntries = [];
                    for (let i = 0; i < entries.length; i++) {
                        let currentEntry = entries[i];
                        if (currentEntry.tutor) currentEntry.tutor.password = "";
                        purgedEntries.push({
                            _id: currentEntry._id,
                            fullName: currentEntry.fullName,
                            tutor: currentEntry.tutor,
                            gender: currentEntry.gender,
                            grade: currentEntry.grade,
                            email: currentEntry.email,
                            cellPhoneNum: currentEntry.cellPhoneNum,
                            parentFullName: currentEntry.parentFullName,
                            parentEmail: currentEntry.parentEmail,
                            parentCellPhoneNum: currentEntry.parentCellPhoneNum,
                            payment: currentEntry.payment,
                            duplicate: currentEntry.duplicate,
                            courses: currentEntry.courses,
                            created: currentEntry.created,
                            state: currentEntry.state,
                            notifications: currentEntry.notifications,
                            pairingAcceptance: currentEntry.pairingAcceptance,
                            ideas: currentEntry.ideas
                        });
                    }
                    res.sendBaseResponse(NAME, null, purgedEntries);
                });
            } else {
                res.sendBaseResponse(NAME, new UserError('Must be an admin to retrieve tutoring request entries for the specified user.'));
            }
        }
    }
};
