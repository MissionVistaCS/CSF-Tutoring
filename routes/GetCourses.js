let courses = require(_base + 'resources/courses.json');

module.exports = {
	'/api/courses': {
		methods: ['get'],
		middleware: [],
		fn: function(req, res, next) {
		/*	let retArray = [];
			for(let entry in courses) {
				let push = {};
				push[entry] = courses[entry];
				retArray.push(push);
			}
			res.json({ retArray });
		*/
			res.json(courses);
		}
	}
}
