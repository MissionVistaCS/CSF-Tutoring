const boiler = require(_base + 'middleware/Boiler'),
      TutorRequest = require(_base + 'models/TutorRequestEntry');

const NAME = 'Modify Tutor Request';

module.exports = {
	'/api/editrequest': {
		methods: ['put'],
		middleware: [boiler.requireFields(['fullName', 'gender', 'grade', 'email', 'cellPhoneNum', 'parentFullName', 'parentEmail', 'parentCellPhoneNum', 'payment', 'duplicate', 'courses', 'state', 'notifications']), boiler.makeInts(['grade']), boiler.makeEmails(['email', 'parentEmail']), boiler.makePhoneNums(['cellPhoneNum', 'parentCellPhoneNum']), boiler.makeBooleans(['duplicate']), boiler.handleErrors],
		fn: function(req, res, next) {
			if (req.user.userGroup === 'ADMIN') {
				let updateFields = {};
				const id = req.body.id;

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

				if (req.body.parentFullName) {
					updateFields.parentFullName = req.body.parentFullName;
				}

				if (req.body.parentEmail) {
					updateFields.parentEmail = req.body.parentEmail;
				}

				if (req.body.parentCellPhoneNum) {
					updateFields.parentCellPhoneNum = req.body.parentCellPhoneNum;
				}

				if (req.body.payment) {
					updateFields.payment = req.body.payment;
				}

				if (req.body.duplicate) {
					updateFields.duplicate = req.body.duplicate;
				}

				if (req.body.courses) {
					updateFields.courses = req.body.courses;
				}

				if (req.body.state) {
					updateFields.state = req.body.state;
				}

				TutorRequest.findOneAndUpdate({ _id: id }, updateFields, function(err, result) {
					if (err) {
						return res.sendBaseResponse(NAME, err);
					}

					res.sendBaseResponse(NAME, null, 'Modified Tutor Request');
				});
			}
		}
	}
}
