const passport = require('passport'),
      boiler = require(_base + 'middleware/Boiler'),
      User = require(_base + 'models/User'),
      CellPhoneVerification = require(_base + 'models/CellphoneVerifyEntry');	

module.exports = {
	'/api/signup': {
		methods: ['post'],
		middleware: [boiler.requireFields(['fullName', 'password', 'gender', 'grade', 'email', 'cellPhoneNum', 'userGroup']), boiler.makeInts(['grade']), boiler.makeEmails(['email']), boiler.makePhoneNums(['cellPhoneNum']), boiler.handleErrors],
		fn: function(req, res, next) {
			let options = {
				fullName: req.body.fullName,
				password: req.body.password,
				gender: req.body.gender,
				grade: req.body.gender,
				email: req.body.email,
				cellPhoneNum: req.body.cellPhoneNum,
				userGroup: req.body.userGroup
			};
			if (req.user && req.user.userGroup.includes('ADMIN')) {
				options.verified = true;
				options.cellPhoneVerified = true;
				let user = new User(options);
				user.save();
			}

			else {
				if (req.body.userGroup.includes('ADMIN')) {
					req.body.userGroup.splice(req.body.userGroup.indexOf('ADMIN'), 1);
				}
				
				let user = new User(options);
				user.save(function(err, user) {


                    let cellphoneVerify = new CellPhoneVerification({
                        user: user._id
                    });
                    cellphoneVerify.save(function (err, cellphoneVerify) {

                    });
				});
			}
		}
	}
	
};
