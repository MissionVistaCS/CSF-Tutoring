const passport = require('passport'),
    boiler = require(_base + 'middleware/Boiler'),
    User = require(_base + 'models/User'),
    CellPhoneVerification = require(_base + 'models/CellphoneVerifyEntry');

const NAME = 'Signup new user';

module.exports = {
    '/api/signup': {
        methods: ['post'],
        middleware: [boiler.requireFields(['fullName', 'password', 'gender', 'grade', 'email', 'cellPhoneNum', 'userGroup']), boiler.makeAlphaWithSpaces(['fullName']), boiler.makeAlphas(['gender', 'payment']),
            boiler.makeInts(['grade', 'maxStudents']), boiler.makeEmails(['email']), boiler.makePhoneNums(['cellPhoneNum']), boiler.handleErrors],
        fn: function (req, res, next) {
            let options = {
                fullName: req.body.fullName,
                password: req.body.password,
                gender: req.body.gender,
                grade: req.body.grade,
                email: req.body.email,
                cellPhoneNum: req.body.cellPhoneNum,
                userGroup: req.body.userGroup
            };

            //Optional fields. Required for tutors.
            if (req.body.maxStudents) options.maxStudents = req.body.maxStudents;
            if (req.body.payment) options.payment = req.body.payment;
            if (req.body.courses) options.courses = req.body.courses;

            //Check required fields for tutors
            if (options.userGroup.includes('TUTOR')) {
                let response = new BaseResponse('Incorrect parameters');

                if (!options.maxStudents) response.addError(new UserError('Missing maxStudents - required for TUTOR'));
                if (!options.payment) response.addError(new UserError('Missing payment - required for TUTOR'));
                if (!options.courses || options.courses.length === 0) response.addError(new UserError('Missing or empty courses - required for TUTOR'));

                if (response.hasErrors()) return res.sendBaseResponse(response);
            }

            //Bypasses certain restrictions if logged in user is an ADMIN
            if (req.user && req.user.userGroup.includes('ADMIN')) {
                options.verified = true;
                options.cellPhoneVerified = true;
            } else {
                if (options.userGroup.includes('ADMIN')) {
                    options.userGroup.splice(options.userGroup.indexOf('ADMIN'), 1);
                    if (options.userGroup.length === 0) return res.sendBaseResponse('Incorrect Parameters', new UserError('You can\'t add an ADMIN user with your permissions.'));
                }
            }

            let user = new User(options);
            user.save(function (err, newUser) {
                if (err) {
                    return res.sendBaseResponse(NAME, new UserError('Mongoose error: duplicate key, invalid field types, etc.'));
                }

                let message = "Signed up " + newUser.fullName + " with id " + newUser._id + " and roles " + newUser.userGroup.join(', ');

                if (newUser.cellPhoneVerified) {
                    res.sendBaseResponse(NAME, null, message);
                } else {
                    let cellphoneVerify = new CellPhoneVerification({
                        user: newUser._id
                    });

                    cellphoneVerify.save(function (err) {
                        if (err) {
                            return res.sendBaseResponse(NAME, err);
                        }

                        res.sendBaseResponse(NAME, null, message);
                    });
                }
            });
        }
    }

};