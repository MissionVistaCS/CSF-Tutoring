const boiler = require(_base + 'middleware/Boiler'),
      User = require(_base + 'models/User');

const NAME = 'Modify User';

module.exports = {
	'/api/edituser': {
		methods: ['put'],
		middleware: [boiler.requireFields(['id']), boiler.makeAlphaWithSpaces(['fullName', 'gender']), boiler.makeAlphas(['gender']), boiler.makeInts(['grade']), boiler.makeEmails(['email']), boiler.makePhoneNums(['cellPhoneNum']), boiler.handleErrors],
		fn: function(req, res, next) {
			if (req.user.userGroup === 'ADMIN') {
				let updateFields = {};
				const id = req.body.id;	// get the id of the user you're trying to modify... could do it by name

				if (req.body.fullName) {
					updateFields.fullName = req.body.fullName;
				}

				if (req.body.password) {
					updateFields.password = req.body.password;
				}

				if (req.body.gender) {
					updateFields.gender = req.body.gender;
				}

				if (req.body.grade) {
					updateFields.grade = req.body.grade;
				}

				if (req.body.email) {
					updateFields.email = req.body.email;
				}

				if (req.body.cellPhoneNum) {
					updateFields.cellPhoneNum = req.body.cellPhoneNum;
				}

				if (req.body.userGroup) {
					updateFields.userGroup = req.body.userGroup;
				}

				User.findOneAndUpdate({ _id: id }, updateFields, function(err, result) {
					if (err) {
						return res.sendBaseResponse(NAME, err);
					}

					res.sendBaseResponse(NAME, null, 'Modified user');
				});
			}
		}
	}

};
