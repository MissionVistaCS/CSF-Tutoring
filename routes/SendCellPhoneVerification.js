const boiler = require(_base + 'middleware/Boiler'),
      auth = require(_base + 'middleware/Authentication'),
      CellPhoneVerification = require(_base + 'models/CellphoneVerifyEntry'),
      User = require(_base + 'models/User'),
      SNS = require(_base + 'services/SNS');

const NAME = 'Send Cellphone Verification';

module.exports = {
    '/api/send-cellphone-verification': {
        methods: ['post'],
        middleware: [auth.ensureAdmin, boiler.requireFields(['_id']), boiler.makeAlphaSpecials(['_id']), boiler.handleErrors],
        fn: function (req, res, next) {
            let tutorId = req.body._id;

            CellPhoneVerification.findOne({user: tutorId}).exec(function (err, cellPhoneVerifyEntry) {
                if (err) {
                    return res.sendBaseResponse(NAME, err);
                }

                if (!cellPhoneVerifyEntry) {
                    return res.sendBaseResponse(NAME, new UserError('No CellphoneVerifyEntry with that Tutor ID found.'));
                }
                User.findById(tutorId).exec(function (err, user) {
                    if (err) {
                        return res.sendBaseResponse(NAME, err);
                    }

                    if (!user) {
                        return res.sendBaseResponse(NAME, new UserError('No User with that ID found.'));
                    }
                    SNS.sendSMS('Please open ' + _url + 'api/verify-cellphone/' + cellPhoneVerifyEntry._id + ' to verify your cell number.', user.cellPhoneNum.replaceAll('-', ''), function (err, data) {
                        if (err) {
                            return res.sendBaseResponse(NAME, new UserError('Error in sending text message.'));
                        }

                        return res.sendBaseResponse(NAME, null, 'Resent Cellphone Verification Message to Tutor');
                    });
                })
            }); 
        }
    }
}