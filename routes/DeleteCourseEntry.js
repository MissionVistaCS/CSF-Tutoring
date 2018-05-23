const auth = require(_base + 'middleware/Authentication'),
	boiler = require(_base + 'middleware/Boiler'),
	Request = require(_base + 'models/TutorRequestEntry.js');

const NAME = 'Delete Course Entry';

module.exports = {
	'/api/delete-course-entry': {
		methods: ['post'],
		middleware: [auth.ensureAdmin, boiler.requireFields(['request', 'course']), boiler.makeAlphaNumerics(['request', 'course']), boiler.handleErrors],
		fn: function(req, res, next) {
			let request = req.body.request;
			let course = req.body.course;
			Request.findById(request, function(err, requestF) {
				if(err) {
					return res.Request(NAME, err);
				}

				if(requestF) {
					let index = requestF.courses.indexOf(course);
					if(index !== -1) {
						requestF.courses.splice(index, 1);
					}
					requestF.save(function (err, requestF) {
						res.sendBaseResponse(NAME, null, 'Removed ' + course + ' course from tutor request');
					});
				}
			});
		}
	}
};
