const auth = require(_base + 'middleware/Authentication'),
	boiler = require(_base + 'middleware/Boiler'),
	User = require(_base + 'models/User.js');

const NAME = 'Delete Course User';

module.exports = {
	'/api/delete-course-user': {
		methods: ['post'],
		middleware: [auth.ensureAdmin, boiler.requireFields(['request', 'course']), boiler.makeAlphaNumerics(['request', 'course']), boiler.handleErrors],
		fn: function(req, res, next) {
			let request = req.body.request;
			let course = req.body.course;
			User.findById(request, function(err, userF) {
				if(err) {
					return res.User(NAME, err);
				}

				if(userF) {
					let index = userF.courses.indexOf(course);
					if(index !== -1) {
						userF.courses.splice(index, 1);
					}
					userF.save(function (err, userF) {
					res.sendBaseResponse(NAME, null, 'Removed ' + course + ' course from user');
					});
				}
			});
		}
	}
};
