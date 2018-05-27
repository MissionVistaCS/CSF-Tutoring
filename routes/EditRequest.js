const boiler = require(_base + 'middleware/Boiler'),
    TutorRequest = require(_base + 'models/TutorRequestEntry'),
    auth = require(_base + 'middleware/Authentication');

const NAME = 'Modify Tutor Request';

/**
 * Edit request does not allow editing of tutor, courses, created, state, notifications, or pairing acceptance. See other routes for those.
 */
module.exports = {
    '/api/edit-request': {
        methods: ['post'],
        middleware: [auth.ensureAdmin, boiler.requireFields(['id']), boiler.makeAlphaSpecials(['id']),
            boiler.makeInts(['grade']), boiler.makeEmails(['email']), boiler.makePhoneNums(['cellPhoneNum', 'parentCellPhoneNum']), boiler.makeAlphas(['gender', 'payment']),
            boiler.makeAlphaWithSpaces(['fullName', 'parentFullName']), boiler.makeBooleans(['duplicate']), boiler.handleErrors],
        fn: function (req, res, next) {
            let updateFields = {};
            const id = req.body.id;

            if (req.body.fullName) updateFields.fullName = req.body.fullName;
            if (req.body.password) updateFields.password = req.body.password;
            if (req.body.gender) updateFields.gender = req.body.gender;
            if (req.body.grade) updateFields.grade = req.body.grade;
            if (req.body.email) updateFields.email = req.body.email;
            if (req.body.cellPhoneNum) updateFields.cellPhoneNum = req.body.cellPhoneNum;
            if (req.body.parentFullName) updateFields.parentFullName = req.body.parentFullName;
            if (req.body.parentEmail) updateFields.parentEmail = req.body.parentEmail;
            if (req.body.parentCellPhoneNum) updateFields.parentCellPhoneNum = req.body.parentCellPhoneNum;
            if (req.body.payment) updateFields.payment = req.body.payment;
            if (req.body.duplicate) updateFields.duplicate = req.body.duplicate;
            if (req.body.state) updateFields.state = req.body.state;
            if (req.body.ideas) updateFields.ideas = req.body.ideas;

            TutorRequest.findOneAndUpdate({_id: id}, updateFields, function (err, result) {
                if (err) {
                    return res.sendBaseResponse(NAME, err);
                }

                res.sendBaseResponse(NAME, null, 'Modified Tutor Request');
            });
        }
    }
};