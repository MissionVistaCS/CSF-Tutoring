const auth = require(_base + 'middleware/Authentication'),
	boiler = require(_base + 'middleware/Boiler'),
	User = require(_base + 'models/User');

const NAME = 'List All Users';

module.exports = {
	'/api/list-users': {
		methods: ['get'],
		middleware: [auth.ensureAdmin],
		fn: function(req, res, next) {
			User.find({}, function(err, users) {
				if(err) {
					return res.sendBaseResponse(NAME, err);
				}

				let retUsers = [];
				for(let i = 0; i < users.length; i++) {
					let curUser = users[i];
					retUsers.push({
						_id: curUser._id,
						fullName: curUser.fullName,
						gender: curUser.gender,
						grade: curUser.grade,
						email: curUser.email,
						cellPhoneNum: curUser.cellPhoneNum,
						userGroup: curUser.userGroup,
						created: curUser.created,
						active: curUser.active,
						verified: curUser.verified,
						cellPhoneVerified: curUser.cellPhoneVerified,
						warnings: curUser.warnings,
						maxStudents: curUser.maxStudents,
						payment: curUser.payment,
						courses: curUser.courses

					});
				}
				res.sendBaseResponse(NAME, null, retUsers);
			});
		}
	}
};
