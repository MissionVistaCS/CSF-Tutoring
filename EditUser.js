const boiler = require(_base + 'middleware/Boiler'),
      mongoose = require('mongoose'),
      User = requie(_base + 'models/User');

module.exports = {
	'/api/edituser': {
		methods: ['put'],
		middleware: [boiler.requireFields(['fullName', 'password', 'gender', 'grade', 'email', 'cellPhoneNum', 'userGroup']), boiler.makeInts(['grade']), boiler.makeEmails(['email']), boiler.makePhoneNums(['cellPhoneNum']), boiler.handleErrors],
		fn: function(req, res, next) {
			if (req.user.userGroup === 'ADMIN') {
				let updateFields = {};
				const _id = req.body._id;	// get the id of the user you're trying to modify... could do it by name

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

				User.findOneAndUpdate({ _id: _id }, updateFields, function(err, result) {
					if (err) {
						return next(err);
					}

					res.json({ result: result }); 
				});
			}
		}
	}

}
