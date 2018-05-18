const passport = require('passport'),
    boiler = require(_base + 'middleware/Boiler'),
    TutorRequestEntry = require(_base + 'models/TutorRequestEntry');

const NAME = 'Submit Tutoring Request';

module.exports = {
    '/api/submit-tutor-request': {
        methods: ['post'],
        middleware: [boiler.requireFields(['fullName', 'gender', 'grade', 'email', 'cellPhoneNum', 'parentFullName', 'parentEmail', 'parentCellPhoneNum', 'payment', 'courses']),
            boiler.makeInts(['grade']), boiler.makeEmails(['email']), boiler.makePhoneNums(['cellPhoneNum', 'parentCellPhoneNum']), boiler.makeAlphas(['gender', 'payment']),
            boiler.makeAlphaWithSpaces(['fullName', 'parentFullName']), boiler.handleErrors],
        fn: function(req, res, next) {
            let options = {
                fullName: req.body.fullName,
                gender: req.body.gender,
                grade: req.body.gender,
                email: req.body.email,
                cellPhoneNum: req.body.cellPhoneNum,
                parentFullName: req.body.parentFullName,
                parentEmail: req.body.parentEmail,
                parentCellPhoneNum: req.body.parentCellPhoneNum,
                payment: req.body.payment,
                courses: req.body.courses
            };

            TutorRequestEntry.findOne({ cellPhoneNum: options.cellPhoneNum, parentCellPhoneNum: options.parentCellPhoneNum }, function (err, res) {
                if (err) {
                    return res.sendBaseResponse(NAME, err);
                }

                if (res) {
                    options.duplicate = true;
                }

                let tutoringRequestEntry = new TutorRequestEntry(options);
                tutoringRequestEntry.save(function (err, newEntry) {
                    if (err) {
                        return res.sendBaseResponse(NAME, err);
                    }

                    //TODO: Start background task for pairing. Pass in tutoringRequestEntry.
                    res.sendBaseResponse(NAME, null, 'Submitted tutoring request');
                });
            });
        }
    }

};
