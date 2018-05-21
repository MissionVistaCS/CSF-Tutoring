const boiler = require(_base + 'middleware/Boiler');
const TutorRequestEntry = require(_base + 'models/TutorRequestEntry');

const NAME = 'List entries for a given tutor';

/**
 * Admins will get a list of entries assigned to a tutor as PENDING, UNACCEPTED, ACTIVE, INACTIVE.
 * Users will get a list of entires assigned to themselves as UNACCEPTED and ACTIVE
 */
module.exports = {
    '/api/list-entries/:user': {
        methods: ['get'],
        middleware: [boiler.requireFields(['user']), boiler.makeAlphaNumerics(['user'])],
        fn: function (req, res, next) {
            let id = req.params.user;
            let isAdmin = req.user.userGroup.includes('ADMIN');

            if (req.user && (isAdmin || req.user._id === id)) {
                TutorRequestEntry.find({ state: { $in: isAdmin ? ['PENDING', 'UNACCEPTED', 'ACTIVE', 'INACTIVE'] : ['UNACCEPTED', 'ACTIVE'] }, tutor: id }, function (err, entries) {
                    let purgedEntries = [];
                    for (let i = 0; i < entries.length; i++) {
                        let currentEntry = entries[i];
                        purgedEntries.push({
                            _id: currentEntry._id,
                            fullName: currentEntry.fullName,
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
                            pairingAcceptance: currentEntry.pairingAcceptance
                        });
                    }
                    res.sendBaseResponse(NAME, null, purgedEntries);
                });
            } else {
                res.sendBaseResponse(NAME, new PermissionError('Must be an admin to retrieve tutoring request entries for the specified user.'));
            }
        }
    }
};
