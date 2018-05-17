const boiler = require(_base + 'middleware/Boiler'),
      mongoose = require('mongoose'),
      TutorRequest = require(_base + 'models/TutorRequestEntry');	

module.exports = {
	'/api/createrequest': {
		methods: ['post'],
		// need to require duplicate?
		middleware: [boiler.requireFields(['tutor', 'fullName', 'gender', 'grade', 'email', 'cellPhoneNum', 'parentFullName', 'parentEmail', 'parentCellPhoneNum', 'payment', 'duplicate', 'courses', 'state', 'notifications']), boiler.makeInts(['grade']), boiler.makeEmails(['email', 'parentEmail']), boiler.makePhoneNums(['cellPhoneNum', 'parentCellPhoneNum']), boiler.makeBooleans(['duplicate']), boiler.handleErrors ],
		fn: function(req, res, next) {

			// create a new tutor request
			let tutorRequest = new TutorRequest({
				tutor: req.body.tutor,
				fullName: req.body.fullName,
				gender: req.body.gender,
				grade: req.body.grade,
				email: req.body.email,
				cellPhoneNum: req.body.cellPhoneNum,
				parentFullName: req.body.parentFullName,
				parentEmail: req.body.parentEmail,
				parentCellPhoneNum: req.body.parentCellPhoneNum,
				payment: req.body.payment,
				duplicate: req.body.duplicate,
				courses: req.body.courses,
				state: req.body.state,
				notifications: req.body.notifications
			});

			// loop and see if the created tutor request matches any other tutor requests in the db
			mongoose.find({}, function(err, result) {
				result.forEach(function(requests) {
					if (requests === tutorRequest) {
						tutorRequest.duplicate = true;
					}
				});
			});

			// saves the tutor request to the db
			tutorRequest.save();

			// TODO: start bg task that handles tutor-entry pairing
			

		}
	}
}
