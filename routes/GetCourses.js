let courses = require(_base + 'resources/courses.json');

module.exports = {
	'/api/courses': {
		methods: ['get'],
		middleware: [],
		fn: function(req, res, next) {
			res.json(courses);
		}
	}
}
