const passport = require('passport'),
    boiler = require(_base + 'middleware/Boiler'),
    TutorRequestEntry = require(_base + 'models/TutorRequestEntry'),
    PairTutor = require(_base + 'services/PairTutor');

const NAME = 'Submit Tutoring Request';

module.exports = {
    '/api/submit-tutor-request': {
        methods: ['post'],
        middleware: [boiler.requireFields(['fullName', 'gender', 'grade', 'email', 'cellPhoneNum', 'parentFullName', 'parentEmail', 'parentCellPhoneNum', 'payment', 'courses']),
            boiler.makeInts(['grade']), boiler.makeEmails(['email']), boiler.makePhoneNums(['cellPhoneNum', 'parentCellPhoneNum']), boiler.makeAlphas(['gender']),
            boiler.makeAlphaWithSpaces(['fullName', 'parentFullName']), boiler.makeAlphaSpecials(['payment']), boiler.handleErrors],
        fn: function (req, res, next) {
            let options = {
                fullName: req.body.fullName,
                gender: req.body.gender,
                grade: req.body.grade,
                email: req.body.email,
                cellPhoneNum: req.body.cellPhoneNum,
                parentFullName: req.body.parentFullName,
                parentEmail: req.body.parentEmail,
                parentCellPhoneNum: req.body.parentCellPhoneNum,
                payment: req.body.payment,
                courses: req.body.courses,
                ideas: req.body.ideas
            };

            TutorRequestEntry.findOne({
                cellPhoneNum: options.cellPhoneNum,
                parentCellPhoneNum: options.parentCellPhoneNum
            }, function (err, entry) {
                if (err) {
                    return res.sendBaseResponse(NAME, err);
                }

                if (entry) {
                    options.duplicate = true;
                }

                let tutoringRequestEntry = new TutorRequestEntry(options);
                tutoringRequestEntry.save(function (err, newEntry) {
                    if (err) {
                        return res.sendBaseResponse(NAME, err);
                    }

                    PairTutor.pairRequestWithTutor(newEntry._id);
                    res.sendBaseResponse(NAME, null, 'Submitted tutoring request');
                });
            });
        }
    }

};
