const NAME = 'Current user';

module.exports = {
    '/api/session': {
        methods: ['get'],
        fn: function (req, res, next) {
            if (!req.user) {
                return res.sendBaseResponse(NAME, new UserError(_strings.get('errors.currentuser.found')));
            }

            res.sendBaseResponse(NAME, null, {
                id: req.user._id,
                fullName: req.user.fullName,
                gender: req.user.gender,
                grade: req.user.grade,
                email: req.user.email,
                cellPhoneNum: req.user.cellPhoneNum,
                userGroup: req.user.userGroup,
                created: req.user.created,
                active: req.user.active,
                verified: req.user.verified,
                cellPhoneVerified: req.user.cellPhoneVerified,
                // warnings: req.user.warnings,
                maxStudents: req.user.maxStudents,
                payment: req.user.payment,
                courses: req.user.courses
            });
        }
    }
};
