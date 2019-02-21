const auth = require(_base + 'middleware/Authentication'),
	boiler = require(_base + 'middleware/Boiler'),
	User = require(_base + 'models/User');

const NAME = 'Add Course User'

module.exports = {
	'/api/add-course-user': {
		methods: ['post'],
		middleware: [auth.ensureAdmin, boiler.requireFields(['user', 'course']), boiler.makeAlphaNumerics(['user', 'course']), boiler.handleErrors],
		fn: function (req, res, next) {
			let user = req.body.user;
			let course = req.body.course;
			User.findById(user, function (err, userF) {
				if(err) {
					return res.sendBaseResponse(NAME, err);
				}

				if(userF) {
					userF.courses.push(course);
					userF.save(function (err, updatedF) {
						res.sendBaseResponse(NAME, null, 'Added ' + course + ' course to the user.');
					});
				}
			});
		}
	}
}
