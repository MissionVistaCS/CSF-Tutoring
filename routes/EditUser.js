const boiler = require(_base + 'middleware/Boiler'),
    User = require(_base + 'models/User');

const NAME = 'Modify User';

module.exports = {
    '/api/edituser': {
        methods: ['post'],
        middleware: [boiler.requireFields(['_id']), boiler.makeAlphaSpecials(['_id']), boiler.makeAlphaWithSpaces(['fullName']), boiler.makeAlphas(['gender', 'payment']),
            boiler.makeInts(['grade', 'maxStudents']), boiler.makeEmails(['email']), boiler.makePhoneNums(['cellPhoneNum']), boiler.handleErrors],
        fn: function (req, res, next) {
            const id = req.body._id;
console.log(req.user);
            if (req.user && (req.user.userGroup.includes('ADMIN') || req.user._id === id)) {
                let updateFields = {};

                if (req.body.fullName) updateFields.fullName = req.body.fullName;
                if (req.body.password) updateFields.password = req.body.password;
                if (req.body.gender) updateFields.gender = req.body.gender;
                if (req.body.grade) updateFields.grade = req.body.grade;
                if (req.body.email) updateFields.email = req.body.email;
                if (req.body.cellPhoneNum) updateFields.cellPhoneNum = req.body.cellPhoneNum;
                if (req.body.userGroup) updateFields.userGroup = req.body.userGroup;
		if (req.body.verified) updateFields.verified = req.body.verified;

                //Optional fields. Required for tutors.
                if (req.body.maxStudents) updateFields.maxStudents = req.body.maxStudents;
                if (req.body.payment) updateFields.payment = req.body.payment;
                if (req.body.courses) updateFields.courses = req.body.courses;

                //Check required fields for tutors
                if (updateFields.userGroup && updateFields.userGroup.includes('TUTOR')) {
                    let response = new BaseResponse('Incorrect parameters');

                    if (!updateFields.maxStudents) response.addError(new UserError('Missing maxStudents - required for TUTOR'));
                    if (!updateFields.payment) response.addError(new UserError('Missing payment - required for TUTOR'));
                    if (!updateFields.courses || updateFields.courses.length === 0) response.addError(new UserError('Missing or empty courses - required for TUTOR'));

                    if (response.hasErrors()) return res.sendBaseResponse(response);
                }

                if (!req.user.userGroup.includes('ADMIN') && updateFields.userGroup.includes('ADMIN')) { //Users shouldn't be able to edit themselves into admins...
                    updateFields.userGroup.splice(updateFields.userGroup.indexOf('ADMIN'), 1);
                    if (updateFields.userGroup.length === 0) return res.sendBaseResponse('Incorrect Parameters', new UserError('You can\'t add an ADMIN user with your permissions.'));
                }

                User.findOneAndUpdate({_id: id}, updateFields, function (err, newUser) {
                    if (err) {
                        return res.sendBaseResponse(NAME, new UserError('Mongoose error: duplicate key, invalid field types, etc.'));
                    }

                    res.sendBaseResponse(NAME, null, "Modified " + newUser.fullName + " with id " + newUser._id + " and roles " + newUser.userGroup.join(', '));
                });
            } else {
                res.sendBaseResponse(NAME, new UserError('Must be an admin to edit specified user.'));
            }
        }
    }

};
