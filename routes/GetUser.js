const auth = require(_base + 'middleware/Authentication'),
    boiler = require(_base + 'middleware/Boiler'),
    User = require(_base + 'models/User');

const NAME = 'Get User';

module.exports = {
    '/api/get-user': {
        methods: ['get'],
        middleware: [auth.ensureAdmin, boiler.requireFields(['_id']), boiler.makeAlphaSpecials(['_id']), boiler.handleErrors],
        fn: function (req, res, next) {
            let id = req.query._id;
            User.findOne({_id: id}, function (err, user) {
                if (err) {
                    return res.sendBaseResponse(NAME, err);
                } else {
                    res.sendBaseResponse(NAME, null, {
                        _id: user._id,
                        fullName: user.fullName,
                        gender: user.gender,
                        grade: user.grade,
                        email: user.email,
                        cellPhoneNum: user.cellPhoneNum,
                        userGroup: user.userGroup,
                        created: user.created,
                        active: user.active,
                        verified: user.verified,
                        cellPhoneVerified: user.cellPhoneVerified,
                        warnings: user.warnings,
                        maxStudents: user.maxStudents,
                        payment: user.payment,
                        courses: user.courses
                    });
                }
            });
        }
    }
};
