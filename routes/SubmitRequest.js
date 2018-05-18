const passport = require('passport'),
    boiler = require(_base + 'middleware/Boiler');

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


        }
    }

};
