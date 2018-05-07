const User = require(_base + 'models/user');

module.exports = {
	'/create/user': {
		methods: ['post'],
		fn: function(req, res, next) {
			// i have no idea how many fields i need yay
			let name = req.body.name,
			    password = req.body.password,
			    gender = req.body.gender,
			    grade = req.body.grade,
			    email = req.body.email,
			    phone = req.body.phone,
			    group = req.body.group,
			    active = req.body.active;

			User.find({ name: name }, function(err, result) {
				if (err) {
					return next(err);
				}

				if (result) {
					return next(new User('User with that email already exists'));
				}

				let user = new User({ 
					name: name,
					password: password,
					gender: gender,
					grade: grade,
					email: email,
					phone: phone,
					group: group
				});

				user.save(function(err) {
					if (err) {
						return next(err);
					}

					res.json({ result: { name: name } });
				});
			});
		}
	}
}	
